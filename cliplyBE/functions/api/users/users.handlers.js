/* eslint-disable */
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");

const asset = (file) => path.join(__dirname, "../../assets", file);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // user: process.env.GMAIL_EMAIL, // e.g., "alvarez.arnoldo@gmail.com"
    user: "alvarez.arnoldo@gmail.com", // e.g., "alvarez.arnoldo@gmail.com"
    // pass: process.env.GMAIL_APP_PASSWORD, // 16-char app password
    pass: "ubfiljheujsrwhsy", // 16-char app password
  },
  logger: true, // optional: helpful during debugging
  debug: true, // optional
});

const normalizePem = (pemMaybe) => {
  if (!pemMaybe) return "";
  return pemMaybe
    .replace(/\\n/g, "\n") // unescape \n from .env
    .replace(/\r\n?/g, "\n") // normalize CRLF/CR
    .replace(/^\uFEFF/, "") // strip BOM
    .trim()
    .replace(/^['"]|['"]$/g, ""); // strip surrounding quotes if present
};
let keyObject;
let selfTestDone = false;

const publicFpFromPem = (pem) => {
  try {
    const header = (pem.split("\n")[0] || "").trim();
    if (header.includes("BEGIN PUBLIC KEY")) {
      const pub = crypto.createPublicKey({
        key: pem,
        format: "pem",
        type: "spki",
      });
      return crypto
        .createHash("sha256")
        .update(pub.export({ type: "spki", format: "pem" }))
        .digest("hex");
    }
    if (
      header.includes("BEGIN PRIVATE KEY") ||
      header.includes("BEGIN RSA PRIVATE KEY")
    ) {
      const type = header.includes("RSA PRIVATE KEY") ? "pkcs1" : "pkcs8";
      const priv = crypto.createPrivateKey({ key: pem, format: "pem", type });
      const pub = crypto.createPublicKey(priv);
      return crypto
        .createHash("sha256")
        .update(pub.export({ type: "spki", format: "pem" }))
        .digest("hex");
    }
  } catch (e) {
    console.error("Public key fingerprint error:", e);
  }
  return null;
};

const loadPrivateKeyOnce = () => {
  if (keyObject) return keyObject;

  const isEmulator = process.env.FUNCTIONS_EMULATOR === "true";
  const pemLocal = normalizePem(process.env.PRIVATE_KEY_PEM || "");
  const pemSecret = normalizePem(process.env.RSA_PRIVATE_KEY || "");

  // choose ONE source
  const chosenPem = isEmulator ? pemLocal : pemSecret;
  if (!chosenPem) {
    throw new Error(
      isEmulator
        ? "Missing PRIVATE_KEY_PEM in .env (dev)"
        : "Missing RSA_PRIVATE_KEY in Secret Manager (prod)"
    );
  }

  // if both exist (e.g., in dev), only warn on true key mismatch
  if (pemLocal && pemSecret) {
    const fLocal = publicFpFromPem(pemLocal);
    const fSecret = publicFpFromPem(pemSecret);
    if (fLocal && fSecret && fLocal !== fSecret) {
      console.warn(
        "Public key mismatch between .env and Secret Manager; using",
        isEmulator ? ".env" : "Secret Manager"
      );
    }
  }

  const header = (chosenPem.split("\n")[0] || "").trim();
  const type = header.includes("RSA PRIVATE KEY") ? "pkcs1" : "pkcs8";
  keyObject = crypto.createPrivateKey({ key: chosenPem, format: "pem", type });
  return keyObject;
};

const decryptingPINAndReturningIt = (encrypted_pin) => {
  try {
    const keyObject = loadPrivateKeyOnce();

    // const { encrypted_pin } = req.body || {};
    if (!encrypted_pin)
      return {
        error_message: "Missing encryptedPin",
      };

    const decrypted = crypto.privateDecrypt(
      {
        key: keyObject,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encrypted_pin, "base64")
    );

    const decrypted_pin = decrypted.toString("utf8");
    console.log("Decrypted PIN:", decrypted_pin);
    // TODO: use `pin` securely (e.g., update Firebase password, or hash & discard)
    return decrypted_pin; // ← do NOT send the pin back
  } catch (e) {
    // console.error("Decrypt failed:", e);
    return { error: "Decrypt failed" };
  }
};

const isValidEmail = (s) =>
  typeof s === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const sendingEmailToUser = async (email, encrypted_pin) => {
  console.log("encrypted_pin at sendingEmailToUser:", encrypted_pin);
  const to = (email || "").trim().toLowerCase();
  if (!isValidEmail(to)) {
    console.error("Invalid recipient email:", email);
    return null;
  }

  const decrypted_pin = decryptingPINAndReturningIt(encrypted_pin);
  console.log("DECRYPTED PIN AT HANDLER:", decrypted_pin);
  // Optional: quick sanity check; throws on bad auth/connection
  await transporter.verify();

  const preheader =
    "Use this code to sign in. Utiliza este código para acceder.";

  const mailOptions = {
    // from: process.env.GMAIL_EMAIL, // must match the authenticated account
    from: "alvarez.arnoldo@gmail.com", // must match the authenticated account
    to,
    subject: "Your Cliply PIN",
    text: `Use this code to sign in:\n\n${decrypted_pin}\n\nIf you didn't request this, ignore this email.`,

    attachments: [
      {
        filename: "at_restaurant-shopping.png",
        path: asset("at_restaurant-shopping.png"),
        cid: "cliply-hero",
      },
      //   {
      //     filename: "cliply_provisional_logo_black_bg.png",
      //     path: asset("cliply_provisional_logo_black_bg.png"),
      //     cid: "cliply-logo",
      //   },
    ],
    html: `
  <div style="margin:0;padding:0;background:#0b0c0f;">
    <!-- Preheader (hidden in body but visible in inbox preview) -->
    <div style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;color:transparent;">
      ${preheader}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#0b0c0f;">
      <tr>
        <td align="center" style="padding:24px 16px;">
          <table role="presentation" width="560" cellspacing="0" cellpadding="0" border="0" style="width:560px;max-width:560px;background:#101318;border-radius:16px;overflow:hidden;border:1px solid #1c2230;">
            <!-- Header -->
            <tr>
              <td style="padding:20px 24px;background:#0f131a;">
                <table role="presentation" width="100%">
                  <tr>
                    <td align="left">
                    <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:40px;line-height:1.3;color:#ffffff;">
                        Cliply
                    </h1>
                    </td>
                    
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Hero -->
            <tr>
              <td style="background:#141a24;">
                <img src="cid:cliply-hero" width="560" height="auto" alt="Cliply hero" style="display:block;width:100%;height:auto;border:0;">
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:28px 24px;background:#101318;">
                <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:22px;line-height:1.3;color:#ffffff;">
                  Your Cliply PIN
                </h1>
                <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#c7cfdd;">
                  Use this code to sign in or change your PIN:
                </p>

                <!-- Code box -->
                <div style="margin:0 0 20px;">
                  <div style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:28px;font-weight:700;letter-spacing:6px;color:#101318;background:#ffffff;border-radius:12px;padding:14px 18px;border:1px solid #e6e8ef;">
                    ${decrypted_pin}
                  </div>
                </div>
                
                <h1 style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.3;color:#ffffff;">
                  Español: Usa este PIN para acceder o cambiar tu PIN
                </h1>
                

                <p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#8c96a6;">
                  If you didn’t request this, you can ignore this email. | Si no solicitaste este código, ignora este correo.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:18px 24px;background:#0f131a;">
                <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#778199;">
                  © ${new Date().getFullYear()} Cliply. All rights reserved.
                </p>
              </td>
            </tr>
          </table>

          <!-- Dark-mode safety text contrast -->
          <div style="height:24px;"></div>
        </td>
      </tr>
    </table>
  </div>
  `,

    // (Optional) Make the SMTP envelope explicit; usually not needed, but can help:
    envelope: {
      from: process.env.GMAIL_EMAIL,
      to: to,
    },
    headers: {
      "X-Entity-Ref-ID": `cliply-${Date.now()}`,
    },
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("SMTP accepted:", info.accepted);
    // console.log("SMTP rejected:", info.rejected);
    // console.log("MessageID:", info.messageId);
    // console.log("Server response:", info.response);
    return {
      ok: true,
      message: "Email sent successfully...",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = {
  loadPrivateKeyOnce,
  decryptingPINAndReturningIt,
  sendingEmailToUser,
};
