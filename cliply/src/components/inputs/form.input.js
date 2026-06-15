// import styled from "styled-components/native";
// import { TextInput } from "react-native-paper";
// import { theme } from "../../infrastructure/theme";

// // export const FormInput = styled(TextInput)`
// //   width: 100%;
// //   background-color: #ffffff;
// // `;

// export const FormInput = styled(TextInput).attrs(
//   ({ $fontFamily = theme.fonts.bold, $fontSize = 16 }) => ({
//     mode: "flat",
//     underlineColor: "transparent",
//     // This styles the actual text inside the input:
//     contentStyle: {
//       fontFamily: $fontFamily,
//       fontSize: $fontSize,
//       includeFontPadding: false, // Android nicety
//       textAlignVertical: "center",
//     },
//   })
// )`
//   width: 100%;
//   background-color: #ffffff;
//   /* Container styles go here (padding/margins/width), not font */
// `;
// components/inputs/form.input.js
import React, { forwardRef } from "react";
import styled from "styled-components/native";
import { TextInput as PaperTextInput } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

const StyledInput = styled(PaperTextInput).attrs(
  ({ $fontFamily = theme.fonts.bold, $fontSize = 16 }) => ({
    mode: "flat",
    underlineColor: "transparent",
    contentStyle: {
      fontFamily: $fontFamily,
      fontSize: $fontSize,
      includeFontPadding: false,
      textAlignVertical: "center",
    },
  })
)`
  width: 100%;
  background-color: #ffffff;
`;

// ✅ Critical: forward the ref to PaperTextInput, so .focus() works reliably
export const FormInput = forwardRef((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});
