import React, { forwardRef } from "react";
import styled from "styled-components/native";
import { TextInput as PaperTextInput } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

const StyledInput = styled(PaperTextInput).attrs(
  ({ $fontFamily = theme.fonts.bold, $fontSize = 16 }) => ({
    mode: "flat",

    underlineColor: "transparent",
    activeUnderlineColor: theme.colors.ui.primary,
    cursorColor: theme.colors.ui.primary,
    selectionColor: theme.colors.ui.primary,
    textColor: theme.colors.text.primary,
    placeholderTextColor: theme.colors.text.secondary,

    theme: {
      colors: {
        primary: theme.colors.ui.primary,
        secondary: theme.colors.ui.primary,
        tertiary: theme.colors.ui.primary,

        onSurface: theme.colors.text.primary,
        onSurfaceVariant: theme.colors.text.secondary,

        background: "#ffffff",
        surface: "#ffffff",
      },
    },

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
