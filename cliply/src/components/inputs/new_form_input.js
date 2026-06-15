// new_form_input.js
import React, { forwardRef } from "react";
import { TextInput } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const New_FormInput = forwardRef(
  ({ handleFirstBlur, ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        mode="flat"
        underlineColor="transparent"
        selectionColor={theme.colors.ui.primary}
        onBlur={handleFirstBlur} // <- forward onBlur
        {...props}
      />
    );
  }
);
