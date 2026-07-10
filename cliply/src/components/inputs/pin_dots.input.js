import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // expo vector icons
import { Spacer } from "../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme/index.js";
import { Container } from "../global_components/containers/general_containers.js";

import { GlobalContext } from "../../infrastructure/services/global/global.context.js";

export const PinDotsInput = ({
  length = 6,
  value,
  onChange,
  onFulfill,
  autoFocus = true,
  themeColor = "#000000",
  digitColor = "#000000",
  size = 20,
  showDelete = true, // <- toggle CTA
}) => {
  const [pin, setPin] = useState(value ?? "");
  const inputRef = useRef(null);
  useEffect(() => {
    if (typeof value === "string" && value !== pin) {
      setPin(value.slice(0, length));
    }
  }, [value, length]);

  useEffect(() => {
    onChange?.(pin);
    if (pin.length === length) onFulfill?.(pin);
  }, [pin]);

  // 1) Focus on mount (tiny delay helps iOS stick the focus)
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, []);

  const handleChange = (txt) => {
    const onlyDigits = txt.replace(/\D/g, "").slice(0, length);
    setPin(onlyDigits);
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleBlur = () => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const focus = () => inputRef.current?.focus();
  // inputRef.current?.blur();
  const cells = Array.from({ length }).map((_, i) => {
    const ch = pin[i];
    return (
      <View key={i} style={[styles.cell, { width: size * 2.2 }]}>
        {ch ? (
          <Text
            style={[styles.digit, { fontSize: size * 1.2, color: digitColor }]}
          >
            {ch}
          </Text>
        ) : (
          <View
            style={[
              styles.dot,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                backgroundColor: themeColor,
              },
            ]}
          />
        )}
      </View>
    );
  });
  return (
    <View
      style={{
        alignItems: "center",
        gap: 12,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <>
        <Spacer position="left" size="extraLarge" />
        <Pressable onPress={focus} style={styles.wrapper}>
          <TextInput
            ref={inputRef}
            value={pin}
            onChangeText={handleChange}
            keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
            inputMode="numeric"
            textContentType="oneTimeCode"
            autoComplete="one-time-code"
            importantForAutofill="yes"
            autoFocus={autoFocus}
            // onBlur={handleBlur}
            maxLength={length}
            caretHidden
            onBlur={handleBlur}
            selection={{ start: pin.length, end: pin.length }}
            style={styles.hiddenInput}
          />
          <View style={styles.cellsRow}>{cells}</View>
        </Pressable>

        {/* {showDelete && pin.length > 0 && ( */}
        <TouchableOpacity
          onPress={pin.length > 0 ? handleDelete : null}
          style={styles.deleteBtn}
        >
          <MaterialIcons
            name="backspace"
            size={28}
            color={pin.length > 0 ? digitColor : theme.colors.ui.disabled}
          />
        </TouchableOpacity>
        {/* )} */}
      </>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { alignItems: "center", justifyContent: "center" },
  hiddenInput: { position: "absolute", opacity: 0, height: 40, width: 200 },
  cellsRow: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cell: { alignItems: "center", justifyContent: "center" },
  dot: { opacity: 0.7 },
  digit: { fontWeight: "600", letterSpacing: 1 },
  deleteBtn: { padding: 8 },
});
