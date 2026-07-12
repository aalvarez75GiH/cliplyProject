import React, { createContext, useState, useEffect } from "react";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store"; // Ensure this is installed
import forge from "node-forge";
import { SERVER_PUBLIC_KEY_PEM } from "@env";
import {
  getAuth,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  initializeAuth,
  createUserWithEmailAndPassword,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

import {
  post_user_Request,
  get_user_by_uid_and_user_data_Request,
  put_preference_language_Request,
  put_new_pin_Request,
  resettingPINRequest,
} from "./global.requests";
import { Email_For_Login_Tile } from "../../../components/tiles/email_for_login.tile";
import { Spacer } from "../../../components/global_components/optimized.spacer.component";
import { Whole_Screen_Loading_Spinner_Component } from "../../../components/global_components/whole_screen_loading_spinner.component";
import { get_User_Data_Request } from "../home/text_clips.requests";
import { deleteRecentTextClipRequest } from "../voice_recents/voice_recent.requests";
import { delete_Stored_Text_Clip_Request } from "../../services/global/global.requests";
import { theme } from "../../theme/index";

// Create Global Context
export const GlobalContext = createContext();

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnf4GGhTXxqMersW4ufM5zayh3BRYLyoM",
  authDomain: "cliplybe.firebaseapp.com",
  projectId: "cliplybe",
  storageBucket: "cliplybe.firebasestorage.app",
  messagingSenderId: "136903132349",
  appId: "1:136903132349:web:7b5638842445acdd5723d4",
};

// Initialize Firebase App (only if not already initialized)
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]; // Use the already initialized app
}

// Auth singleton (RN vs Web)
let auth;
if (Platform.OS === "web") {
  // web can use getAuth (browser persistence)
  auth = getAuth(app);
} else {
  // React Native: ensure AsyncStorage persistence
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch (e) {
    // If already initialized (Fast Refresh), just grab it
    auth = getAuth(app);
  }
}
export { app, auth };
// export const db = app.firestore();
let IS_AUTHENTICATED_KEY = "isAuthenticated";
let UID_KEY = "uid";
let PREFERENCE_LANGUAGE_KEY = "preference_language";
let USER_EMAIL_KEY = "userEmails";
let ACTIVE_EMAIL = "activeEmail";

export const GlobalContextProvider = ({ children, navigation }) => {
  const [globalLanguage, setGlobalLanguage] = useState("EN");
  const [isLoading, setIsLoading] = useState(false);
  const [languageIsLoading, setLanguageIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToDB, setUserToDB] = useState(null);
  const [pin, setPin] = useState("");
  const [new_pin, setNew_pin] = useState("");
  const [automaticPIN, setAutomaticPIN] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  // const [activeEmail, setActiveEmail] = useState("");
  const [isUserDataLoading, setIsUserDataLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDataError, setUserDataError] = useState(null);
  const [deletedStatus, setDeletedStatus] = useState(false);
  const [hasStoredEmail, setHasStoredEmail] = useState(false);
  const [storedEmail, setStoredEmail] = useState(null);
  const [authHasBeenChecked, setAuthHasBeenChecked] = useState(false);

  const [emailError, setEmailError] = useState(null);
  const [errorInAuthentication, setErrorInAuthentication] = useState(null);
  const [errorInUpdatingPIN, setErrorInUpdatingPIN] = useState(null);

  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    actionLabel: "OK",
    onAction: null,
    bgColor: theme.colors.ui.primary,
  });

  useEffect(() => {
    console.log("GLOBAL CONTEXT AUTH STATE ACTUALLY CHANGED:", isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    const checkingAuthenticationAndLoggingAsyncStorage = async () => {
      checkAuthentication();
      logSecureStorage();
    };

    checkingAuthenticationAndLoggingAsyncStorage();
  }, []);

  // **************** AUTHENTICATION CHECKERS ****************

  const logSecureStorage = async () => {
    try {
      const old_pin = await SecureStore.getItemAsync("user_pin");
      console.log("OLD PIN AT UPDATING FUNCTION:", old_pin);
    } catch (error) {
      console.error("Error reading AsyncStorage:", error);
    }
  };

  const gettingUserDataOnDifferentOperations = async (user_id) => {
    try {
      const user_data = await get_User_Data_Request(user_id);
      console.log("USER DATA STATUS AT TEXT CLIPS CONTEXT:", user_data.status);
      if (user_data.status === 200) {
        setUserData(user_data.data);
        console.log("USER DATA HAS BEEN SET LOADED...");
      }
      if (user_data.status !== 200) {
        console.log("FAILED TO LOAD USER DATA...");
        setUserDataError("Failed to load user data");
      }
    } catch (error) {
      console.error("ERROR GETTING USER DATA AT HOME CONTEXT:", error.message);
    } finally {
      setIsUserDataLoading(false);
    }
  };

  const clearLocalAuth = async ({ forgetEmails = false } = {}) => {
    await AsyncStorage.setItem(IS_AUTHENTICATED_KEY, "false");
    await AsyncStorage.removeItem(UID_KEY);
    await AsyncStorage.removeItem(ACTIVE_EMAIL);
    await AsyncStorage.removeItem(PREFERENCE_LANGUAGE_KEY);
    await SecureStore.deleteItemAsync("user_pin");

    if (forgetEmails) {
      await AsyncStorage.removeItem(USER_EMAIL_KEY);
      setStoredEmail(null);
      setHasStoredEmail(false);
    } else {
      await getStoredEmailState();
    }

    setIsUserDataLoading(false);
    setIsAuthenticated(false);
    setUserToDB(null);
    setUserData(null);
    setPin("");
    setEmail("");
    setFirst_name("");
    setLast_name("");
  };

  const getStoredEmailState = async () => {
    const activeEmail = await AsyncStorage.getItem("activeEmail");
    const userEmailsRaw = await AsyncStorage.getItem("userEmails");

    let userEmails = [];

    try {
      userEmails = userEmailsRaw ? JSON.parse(userEmailsRaw) : [];
    } catch (error) {
      userEmails = [];
    }

    const emailToUse = activeEmail || userEmails[0] || null;

    setStoredEmail(emailToUse);
    setHasStoredEmail(Boolean(emailToUse));

    return { activeEmail, userEmails, emailToUse };
  };

  const checkAuthentication = async () => {
    setIsLoading(true);
    setIsUserDataLoading(false);

    try {
      await getStoredEmailState();

      const storedAuth = await AsyncStorage.getItem("isAuthenticated");
      const uid = await AsyncStorage.getItem("uid");

      if (storedAuth !== "true" || !uid) {
        await clearLocalAuth();
        return;
      }

      setIsUserDataLoading(true);

      const dataFromBackend = await get_user_by_uid_and_user_data_Request(uid);

      if (!dataFromBackend?.data?.uid) {
        await clearLocalAuth({ forgetEmails: false });
        return;
      }

      setUserToDB({
        first_name: dataFromBackend.data.first_name,
        last_name: dataFromBackend.data.last_name,
        email: dataFromBackend.data.email,
        display_name: dataFromBackend.data.display_name,
        isFirstTime: dataFromBackend.data.isFirstTime,
        role: dataFromBackend.data.role,
        uid: dataFromBackend.data.uid,
        updatedAt: dataFromBackend.data.updatedAt,
        createdAt: dataFromBackend.data.createdAt,
        user_id: dataFromBackend.data.user_id,
        preference_language: dataFromBackend.data.preference_language,
      });

      setUserData(dataFromBackend.data.user_data || null);
      setGlobalLanguage(dataFromBackend.data.preference_language || "EN");
      setIsAuthenticated(true);
    } catch (error) {
      console.log("Error checking authentication:", error.message);
      await clearLocalAuth();
    } finally {
      setIsLoading(false);
      setIsUserDataLoading(false);
      setAuthHasBeenChecked(true);
    }
  };
  // ****************** ENCRYPTION HELPERS **********************
  const encryptPinWithServerPublicKey = (pin) => {
    if (typeof pin !== "string") throw new Error("PIN must be a string");

    const publicKey = forge.pki.publicKeyFromPem(SERVER_PUBLIC_KEY_PEM);

    const encrypted = publicKey.encrypt(pin, "RSA-OAEP", {
      md: forge.md.sha256.create(),
      mgf1: { md: forge.md.sha256.create() },
    });
    // encode to base64 for transport
    const b64 = forge.util.encode64(encrypted);
    return b64;
  };

  // **********************************************************

  const togglingGlobalLanguage = async () => {
    setLanguageIsLoading(true);
    try {
      const nextLanguage = globalLanguage === "EN" ? "ES" : "EN";
      const toggling_language_at_DB_response =
        // Persisting at user DB
        await put_preference_language_Request(userToDB.user_id, nextLanguage);

      const { status, user_updated } = toggling_language_at_DB_response.data;
      const { preference_language } = user_updated;

      if (status === "200") {
        setGlobalLanguage(preference_language);
        // await i18n.changeLanguage(nextLanguage);
        await AsyncStorage.setItem(
          PREFERENCE_LANGUAGE_KEY,
          preference_language
        );
        return {
          ok: true,
        };
      } else {
        console.error(
          "Failed to update preference language in DB:",
          toggling_language_at_DB_response
        );
        return {
          ok: false,
          error: "Failed to update preference language in DB",
        };
      }
    } catch (error) {
      console.error("Error toggling language:", error);
    } finally {
      setLanguageIsLoading(false);
    }
  };

  const LoadingOverlay = ({ caption }) => {
    return <Whole_Screen_Loading_Spinner_Component caption={caption} />;
  };

  // *********************** ENCRYPTION HELPERS ***********************

  const savePin = async (pin) => {
    try {
      await SecureStore.setItemAsync("user_pin", pin);
      console.log("PIN saved securely");
    } catch (error) {
      console.error("Error saving PIN:", error);
    }
  };

  const validatingEmail = (email) => {
    // const validate = (text) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    console.log(email, reg.test(email));
    if (!reg.test(email)) {
      setEmailError(reg.test(email) ? null : "Please enter a valid email.");
      return false;
    }
    return true;
  };

  const handlePinChange = (newPin) => {
    setPin(newPin);
    // Check if the PIN is empty
    if (newPin === "") {
      setErrorInAuthentication(null); // Set error when PIN is cleared
    } else {
      setErrorInAuthentication(null); // Clear error when PIN is not empty
    }
  };

  const addEmailToAsyncStorage = async (newEmail) => {
    const existingEmails = await AsyncStorage.getItem("userEmails");
    let emailArray = [];
    // const newEmail = userCredential.user.email;

    if (existingEmails) {
      emailArray = JSON.parse(existingEmails); // Parse existing emails into an array
    }
    if (!emailArray.includes(newEmail)) {
      emailArray.push(newEmail); // Add the new email to the array
      await AsyncStorage.setItem(USER_EMAIL_KEY, JSON.stringify(emailArray)); // Save the updated array
    } else {
      console.log("Email already exists in AsyncStorage.");
    }
    return emailArray;
  };

  const checking_for_array_of_multiple_emails = async () => {
    const existingEmails = await AsyncStorage.getItem("userEmails");
    let emailArray = [];
    if (existingEmails) {
      try {
        emailArray = JSON.parse(existingEmails); // Convert the string to an array
        console.log("Parsed email array:", emailArray);
      } catch (error) {
        console.error("Error parsing existingEmails:", error);
      }
    } else {
      console.log("No emails found in AsyncStorage.");
    }
    // console.log(emailArray.length);
    return emailArray;
  };

  // ********************* LOGIN USER LOGIC *************************

  const signingInWithEmailAndPasswordFunction = async (email, pin) => {
    setIsLoading(true);
    console.log("EMAIL AT SIGNIN FUNCTION:", email);
    console.log("PIN AT SIGNIN FUNCTION:", pin);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await savePin(pin);
      const userCredential = await signInWithEmailAndPassword(auth, email, pin);
      console.log("USER LOGGED IN:", userCredential.user);
      if (userCredential.user) {
        const dataFromBackend = await get_user_by_uid_and_user_data_Request(
          userCredential.user.uid
        );
        console.log("DATA FROM BACKEND:", dataFromBackend.data);
        setUserData(dataFromBackend.data.user_data);
        if (dataFromBackend.data.isFirstTime) {
          console.log("USER IS FIRST TIME...");
          return {
            ok: true,
            next: "Preference_language_View",
            data: dataFromBackend.data,
          };
        }
        setUserToDB({
          first_name: dataFromBackend.data.first_name,
          last_name: dataFromBackend.data.last_name,
          email: dataFromBackend.data.email,
          display_name: dataFromBackend.data.display_name,
          isFirstTime: dataFromBackend.data.isFirstTime,
          role: dataFromBackend.data.role,
          uid: dataFromBackend.data.uid,
          updatedAt: dataFromBackend.data.updatedAt,
          createdAt: dataFromBackend.data.createdAt,
          user_id: dataFromBackend.data.user_id,
          preference_language: dataFromBackend.data.preference_language,
          encrypted_pin: dataFromBackend.data.encrypted_pin,
        });
        await AsyncStorage.setItem(IS_AUTHENTICATED_KEY, "true");
        await AsyncStorage.setItem(UID_KEY, userCredential.user.uid);
        await AsyncStorage.setItem(
          PREFERENCE_LANGUAGE_KEY,
          dataFromBackend.data.preference_language
        );
        await AsyncStorage.setItem(ACTIVE_EMAIL, dataFromBackend.data.email);

        setGlobalLanguage(dataFromBackend.data.preference_language);
        console.log("ABOUT TO SET AUTHENTICATED TRUE");
        setIsAuthenticated(true);
        console.log("SET AUTHENTICATED TRUE WAS CALLED");
        return { success: true };
      } else {
        setIsAuthenticated(false);
        await AsyncStorage.setItem("isAuthenticated", "false");
        console.log("USER NOT AUTHENTICATED...");
      }
    } catch (error) {
      setErrorInAuthentication(
        error.message === "Firebase: Error (auth/missing-email)."
          ? "We haven't found an email for this PIN number"
          : error.message === "Firebase: Error (auth/invalid-credential)."
          ? "We haven't found a user for this PIN number"
          : error.message === "Firebase: Error (auth/too-many-requests)."
          ? "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your PIN or you can try again later."
          : null
      );
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (pin, emailFromInput = null) => {
    console.log("PIN BEFORE LOGIN:", pin);

    const PIN_LENGTH = 6;
    setIsLoading(true);
    // setIsUserDataLoading(true);

    try {
      if (pin.length !== PIN_LENGTH) return;

      const cleanEmail = emailFromInput?.trim().toLowerCase();

      if (cleanEmail) {
        const res = await signingInWithEmailAndPasswordFunction(
          cleanEmail,
          pin
        );

        if (res?.success || res?.ok) {
          await addEmailToAsyncStorage(cleanEmail);
        }

        return res;
      }

      const Emails_array_checked =
        await checking_for_array_of_multiple_emails();

      if (Emails_array_checked.length === 1) {
        const email = Emails_array_checked[0];
        return await signingInWithEmailAndPasswordFunction(email, pin);
      }

      if (Emails_array_checked.length > 1) {
        return {
          ok: true,
          next: "Multiple_Emails_LoginIn_View",
          data: Emails_array_checked,
          action_type: "login",
        };
      }

      setErrorInAuthentication("Please enter your email");
    } finally {
      // setIsUserDataLoading(true);
      setIsLoading(false);
    }
  };

  // This is the action that multiple emails view executes if user selects one email to login
  const login_action_for_multiple_emails = async (item) => {
    console.log("DATA IN ACTION:", item);
    console.log("PIN IN ACTION:", pin);
    const res = await signingInWithEmailAndPasswordFunction(item, pin);
    console.log("RES IN ACTION:", res);
    if (res.success) {
      console.log("LOGIN ACTION SUCCESS");
      setIsLoading(false);
      return;
    }
    if (res?.ok && res?.next) {
      console.log("RES DATA ON LOGIN ACTION FOR MULTIPLE EMAILS:", res.data);
      return {
        action_type: "login",
        next_view: res.next,
        data: res.data,
      };
    } else {
      console.log("Login failed or invalid response AT ACTION");
    }
  };

  // ****************** LOGOUT USER LOGIC ************************
  const loggingOutUser = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await clearLocalAuth({ forgetEmails: false });
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ****************** REGISTER USER LOGIC *********************

  //We generate a random 6-digit PIN
  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const registerUser = async () => {
    setIsLoading(true);
    setEmailError(null);
    setErrorInAuthentication(null);

    const pinGenerated = generatePin();

    console.log("PIN BEFORE REGISTERING:", pinGenerated);

    try {
      const cleanEmail = email?.trim().toLowerCase();

      if (!cleanEmail) {
        throw new Error("Email is required.");
      }

      if (!first_name?.trim() || !last_name?.trim()) {
        throw new Error("First name and last name are required.");
      }

      /*
       * Firebase automatically signs the user in after account creation.
       */
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        pinGenerated
      );

      const createdFirebaseUser = userCredential?.user;

      if (!createdFirebaseUser?.uid || !createdFirebaseUser?.email) {
        throw new Error("Firebase did not return a valid user.");
      }

      console.log("FIREBASE USER CREATED:", createdFirebaseUser.uid);

      const encrypted_pin = encryptPinWithServerPublicKey(pinGenerated);

      const now = new Date().toISOString();

      const userToCreateAtFirebase = {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: createdFirebaseUser.email,
        role: "user",
        uid: createdFirebaseUser.uid,
        createdAt: now,
        updatedAt: now,
        display_name: first_name.trim(),
        encrypted_pin,
      };

      console.log(
        "USER TO CREATE AT BACKEND:",
        JSON.stringify(userToCreateAtFirebase, null, 2)
      );

      const res = await post_user_Request(userToCreateAtFirebase);

      if (!res || res.status < 200 || res.status >= 300) {
        throw new Error(
          res?.response?.data?.message ||
            "The user could not be created on the server."
        );
      }

      /*
       * Keep the account in the local account list.
       */
      await addEmailToAsyncStorage(createdFirebaseUser.email);

      /*
       * Make the newly registered account the currently selected account.
       * This ensures Login_User uses the correct email.
       */
      await AsyncStorage.setItem(ACTIVE_EMAIL, createdFirebaseUser.email);

      setStoredEmail(createdFirebaseUser.email);
      setHasStoredEmail(true);

      /*
       * Registration does not count as a completed app login.
       */
      await AsyncStorage.setItem(IS_AUTHENTICATED_KEY, "false");

      await AsyncStorage.removeItem(UID_KEY);
      await AsyncStorage.removeItem(PREFERENCE_LANGUAGE_KEY);

      /*
       * Clear any previous local session data.
       */
      setIsAuthenticated(false);
      setPin("");
      setNew_pin("");
      setUserToDB(null);
      setUserData(null);
      setErrorInAuthentication(null);

      /*
       * Do not save the generated PIN in SecureStore here.
       * The user should enter it manually on the login screen.
       * Save it only after signInWithEmailAndPassword succeeds.
       */
      await SecureStore.deleteItemAsync("user_pin");

      /*
       * createUserWithEmailAndPassword signs the user into Firebase.
       * Sign out so the user must complete the normal PIN login flow.
       */
      await signOut(auth);

      console.log(
        "REGISTRATION COMPLETED. USER SIGNED OUT AND READY TO LOGIN."
      );

      return {
        ok: true,
        success: true,
        flowType: "register",
        email: createdFirebaseUser.email,
        generatedPin: pinGenerated,
        data: res.data,
      };
    } catch (error) {
      console.error(
        "Error creating user:",
        error?.response?.data || error?.message
      );

      /*
       * If Firebase created the user but the backend request failed,
       * Firebase may still have an authenticated session.
       */
      try {
        if (auth.currentUser) {
          await signOut(auth);
        }
      } catch (signOutError) {
        console.error(
          "Error signing out after failed registration:",
          signOutError.message
        );
      }

      setIsAuthenticated(false);

      await AsyncStorage.setItem(IS_AUTHENTICATED_KEY, "false");

      await AsyncStorage.removeItem(UID_KEY);

      if (
        error?.code === "auth/email-already-in-use" ||
        error?.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        const message =
          globalLanguage === "EN"
            ? "This account already exists"
            : "Esta cuenta ya existe";

        setEmailError(message);

        return {
          ok: false,
          success: false,
          error: message,
          code: error.code,
        };
      }

      if (error?.code === "auth/invalid-email") {
        const message =
          globalLanguage === "EN"
            ? "Please enter a valid email."
            : "Ingresa un correo electrónico válido.";

        setEmailError(message);

        return {
          ok: false,
          success: false,
          error: message,
          code: error.code,
        };
      }

      if (error?.code === "auth/weak-password") {
        const message =
          globalLanguage === "EN"
            ? "The generated PIN could not be used. Please try again."
            : "No se pudo usar el PIN generado. Inténtalo nuevamente.";

        setEmailError(message);

        return {
          ok: false,
          success: false,
          error: message,
          code: error.code,
        };
      }

      const fallbackMessage =
        error?.response?.data?.message ||
        error?.message ||
        (globalLanguage === "EN"
          ? "We could not create your account."
          : "No pudimos crear tu cuenta.");

      setEmailError(fallbackMessage);

      return {
        ok: false,
        success: false,
        error: fallbackMessage,
        code: error?.code,
      };
    } finally {
      setIsLoading(false);
    }
  };

  // ****************** SET PREFERENCE LANGUAGE  LOGIC *********************
  const settingPreferenceLanguage = async (data_to_change) => {
    const language_chosen = data_to_change.language;
    const user_id = data_to_change.user_id;
    setIsLoading(true);
    try {
      const set_preference_language_response =
        await put_preference_language_Request(user_id, language_chosen);

      if (set_preference_language_response.status === 200) {
        const updatedUser = set_preference_language_response.data.user_updated;

        setUserToDB(updatedUser);

        await AsyncStorage.setItem(IS_AUTHENTICATED_KEY, "true");

        await AsyncStorage.setItem(
          UID_KEY,
          set_preference_language_response.data.user_updated.uid
        );
        await AsyncStorage.setItem(
          PREFERENCE_LANGUAGE_KEY,
          set_preference_language_response.data.user_updated.preference_language
        );
        await AsyncStorage.setItem(
          ACTIVE_EMAIL,
          set_preference_language_response.data.user_updated.email
        );

        setGlobalLanguage(
          set_preference_language_response.data.user_updated.preference_language
        );
        return { ok: true, next: "Welcome_To_Cliply_View" };
      } else {
        setIsAuthenticated(false);
        await AsyncStorage.setItem("isAuthenticated", "false");
        console.log("USER NOT AUTHENTICATED...");
      }
    } catch (error) {
      console.error("Error updating preference language:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailForLoginTile = ({ item, action }) => {
    console.log("ITEM AT RENDER EMAIL TILE:", item);
    console.log("ACTION AT RENDER EMAIL TILE:", action);
    return (
      <Spacer position="bottom" size="medium">
        <Email_For_Login_Tile item={item} action={action} />
      </Spacer>
    );
  };

  // ************ GENERATE NEW PIN AUTOMATICALLY AND UPDATE AT FIREBASE LOGIC *************
  const generatingNewRandomPINAndUpdatingUserAtFB = async (user) => {
    setIsLoading(true);
    const Emails_array_checked = await checking_for_array_of_multiple_emails();
    //const Emails_array_checked = ["arnoldo.alvarez75@yahoo.com"];

    try {
      if (Emails_array_checked.length === 1) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const email = Emails_array_checked[0];
        const pinGenerated = generatePin();
        const encrypted_pin = encryptPinWithServerPublicKey(pinGenerated);
        console.log("ENCRYPTED NEW PIN:", encrypted_pin);
        const res = await resettingPINRequest(encrypted_pin, email);
        console.log(
          "RESPONSE FROM RESET PIN REQUEST:",
          JSON.stringify(res, null, 2)
        );
        if (res.status === "200") {
          setAutomaticPIN(pinGenerated);
          return { ok: true };
        } else {
          return { ok: false };
        }
      }
      if (Emails_array_checked.length > 1) {
        setIsLoading(false);
        return {
          ok: true,
          next: "Multiple_Emails_LoginIn_View",
          data: Emails_array_checked,
          action_type: "regenerate_new_pin",
        };
      }
      // Simulate a delay (if needed)
    } catch (error) {
      console.error("Logout error:", error.message);
    } finally {
      // Ensure loading state is updated
      setIsLoading(false);
    }
  };

  const generate_PIN_action_for_multiple_emails = async (email) => {
    setIsLoading(true);
    try {
      console.log("DATA IN ACTION:", email);
      const pinGenerated = generatePin();
      const encrypted_pin = encryptPinWithServerPublicKey(pinGenerated);
      console.log("ENCRYPTED NEW PIN:", encrypted_pin);
      const res = await resettingPINRequest(encrypted_pin, email);
      console.log(
        "RESPONSE FROM RESET PIN REQUEST:",
        JSON.stringify(res, null, 2)
      );
      if (res.status === "200") {
        await savePin(pinGenerated);
        return {
          next_view: "Successful_View",
          action_type: "regenerate_pin",
          label:
            globalLanguage === "EN"
              ? "We have sent you an email with your new PIN"
              : "Te hemos enviado un correo electrónico con tu nuevo PIN",
          cta_label:
            globalLanguage === "EN"
              ? "Back to Login"
              : "Volver al inicio de sesión",
        };
      } else {
        return { ok: false };
      }
    } catch (error) {
      console.error("Error generating new PIN:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ************ UPDATING PIN ON USER DEMAND AND UPDATE USER AT FIREBASE LOGIC *************

  const updatingPINOnDemandAndUpdatingUserAtFB = async (new_pin) => {
    setIsLoading(true);
    try {
      console.log("NEW PIN AT UPDATING FUNCTION CONTEXT:", new_pin);
      const encrypted_pin = encryptPinWithServerPublicKey(new_pin);
      console.log(
        "ENCRYPTED NEW PIN AT UPDATING FUNCTION CONTEXT:",
        encrypted_pin
      );
      const auth = getAuth();
      const user = auth.currentUser;
      console.log("CURRENT USER INSIDE OF UPDATING FUNCTION:", user);

      if (!user) {
        throw new Error("No user is currently logged in.");
      }
      // Validate and refresh the idToken
      try {
        const idToken = await user.getIdToken(true); // Force refresh the token
        console.log("ID Token refreshed successfully:", idToken);
      } catch (tokenError) {
        throw new Error("Failed to refresh ID token. Please try again.");
      }

      const active_email = await AsyncStorage.getItem(ACTIVE_EMAIL);
      if (!active_email) {
        throw new Error("Active email not found in AsyncStorage.");
      }
      console.log("ACTIVE EMAIL:", active_email);

      const old_pin = await SecureStore.getItemAsync("user_pin");
      console.log("OLD PIN AT UPDATING FUNCTION:", old_pin);
      if (!old_pin) {
        // setErrorInUpdatingPIN("Old PIN not found. Please log in again.");
        throw new Error("Old PIN not found in SecureStore.");
      }

      // Reauthenticate only if necessary
      try {
        const credential = EmailAuthProvider.credential(active_email, old_pin);
        const res = await reauthenticateWithCredential(user, credential);
        console.log("Reauthentication successful:", res);
      } catch (error) {
        throw new Error(
          "Reauthentication failed. Please check your credentials:",
          error.message
        );
      }

      // Update the password
      await updatePassword(user, new_pin);
      console.log("Password updated at firebase auth successfully.");
      const new_pin_res = await put_new_pin_Request(
        userToDB.user_id,
        encrypted_pin
      );
      console.log("RESPONSE FROM UPDATING NEW PIN REQUEST:", new_pin_res);

      if (!new_pin_res || new_pin_res !== 200) {
        throw new Error("Failed to update PIN on the server.");
      } else {
        await savePin(new_pin);
        return { success: true };
      }
    } catch (error) {
      console.error("Error updating PIN:", error.message);
      setErrorInUpdatingPIN(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
      setNew_pin("");
    }
  };

  // *************** DELETE ITEMS LOGIC ******************

  const delete_one_recent_clip = async (dataNeededToDeleteTextClip) => {
    const { message_id, user_id } = dataNeededToDeleteTextClip;
    console.log("Deleting item with ID:", message_id);
    console.log("User ID for deletion:", user_id);

    try {
      setIsLoading(true);
      const requestBody = {
        data_to_delete: {
          user_id: user_id,
          message_id: message_id, // Rename `message_id` to `item_id`
        },
      };
      const response = await deleteRecentTextClipRequest(requestBody);

      if (response.status === 404) {
        setDeletedStatus(false);
        gettingUserDataOnDifferentOperations(user_id);
        // loadUserData(user_id);
        console.log("No matching record found to delete.");
      }
      if (response.status === 500) {
        setDeletedStatus(false);
        console.log("An error occurred while deleting the recent message.");
      }
      if (response.status === 200) {
        console.log("Item deleted successfully.");
        setDeletedStatus(true);
        gettingUserDataOnDifferentOperations(user_id);
        // loadUserData(user_id);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      setDeletedStatus(false);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteStoredTextClip = async (dataNeededToDeleteTextClip) => {
    setIsLoading(true);
    const requestBody = {
      specificTextClipData: dataNeededToDeleteTextClip,
    };
    const { user_id } = dataNeededToDeleteTextClip;
    console.log("DATA FOR DELETION AT GLOBAL CONTEXT:", requestBody);

    try {
      const res = await delete_Stored_Text_Clip_Request(requestBody);

      console.log("Response from delete_Stored_Text_Clip__Request:", res);

      if (res.status === 200) {
        console.log("Stored message deleted successfully.");
        setDeletedStatus(true);
        gettingUserDataOnDifferentOperations(user_id);
      } else {
        console.error(
          "Failed to delete stored message. Response status:",
          res.status
        );
        return { success: false, error: "Failed to delete stored message." };
      }
    } catch (error) {
      console.error("Error during deletion request:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  //********** logic to control Snackbar from global context (for error handling and user feedback) **********/

  const showSnackbar = ({
    message,
    actionLabel = "OK",
    onAction = null,
    bgColor = theme.colors.ui.primary,
  }) => {
    setSnackbar({
      visible: true,
      message,
      actionLabel,
      onAction,
      bgColor,
    });
  };

  const hideSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const showErrorSnackbar = (message, onAction = hideSnackbar) => {
    showSnackbar({
      message,
      actionLabel: "OK",
      bgColor: theme.colors.ui.error,
      onAction,
    });
  };

  const showSuccessSnackbar = (
    message,
    onAction = hideSnackbar,
    action_label = "Ok"
  ) => {
    showSnackbar({
      message,
      actionLabel: action_label,
      bgColor: theme.colors.ui.success,
      onAction,
    });
  };

  const requireLoginAfterPinChange = async () => {
    try {
      // End the Firebase authenticated session
      await signOut(auth);

      // Mark the local app session as unauthenticated
      await AsyncStorage.setItem(IS_AUTHENTICATED_KEY, "false");

      // Keep activeEmail and userEmails.
      // They are needed to know which account should log in.
      setIsAuthenticated(false);

      setPin("");
      setNew_pin("");

      setErrorInAuthentication(null);
      setErrorInUpdatingPIN(null);

      setUserToDB(null);
      setUserData(null);

      setIsLoading(false);

      console.log("USER MUST LOG IN AGAIN AFTER PIN CHANGE");
    } catch (error) {
      console.error("Error ending session after PIN change:", error);

      // Still force the local navigator to show login
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        globalLanguage,
        setGlobalLanguage,
        togglingGlobalLanguage,
        isLoading,
        setIsLoading,
        app,
        userToDB,
        isAuthenticated,
        setPin,
        pin,
        errorInAuthentication,
        setErrorInAuthentication,
        loggingOutUser,
        first_name,
        setFirst_name,
        last_name,
        setLast_name,
        email,
        setEmail,
        emailError,
        setEmailError,
        registerUser,
        validatingEmail,
        loginUser,
        handlePinChange,
        setIsAuthenticated,
        checkAuthentication,
        // logAsyncStorage,
        settingPreferenceLanguage,
        signingInWithEmailAndPasswordFunction,
        renderEmailForLoginTile,
        generatingNewRandomPINAndUpdatingUserAtFB,
        automaticPIN,
        setAutomaticPIN,
        login_action_for_multiple_emails,
        generate_PIN_action_for_multiple_emails,
        updatingPINOnDemandAndUpdatingUserAtFB,
        new_pin,
        setNew_pin,
        errorInUpdatingPIN,
        setErrorInUpdatingPIN,
        languageIsLoading,
        LoadingOverlay,
        isUserDataLoading,
        userData,
        userDataError,
        gettingUserDataOnDifferentOperations,
        delete_one_recent_clip,
        deletedStatus,
        setDeletedStatus,
        deleteStoredTextClip,
        setIsAuthenticated,
        showErrorSnackbar,
        showSuccessSnackbar,
        snackbar,
        hideSnackbar,
        hasStoredEmail,
        storedEmail,
        authHasBeenChecked,
        requireLoginAfterPinChange,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
