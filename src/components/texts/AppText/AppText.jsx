import React from "react";
import { Text, StyleSheet } from "react-native";

import { appStyles } from "#styles";

export const AppText = ({
  style,
  namedStyle,
  isBold = false,
  isSemibold = false,
  underlined = false,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles[namedStyle],
        isBold && styles.bold,
        isSemibold && styles.semibold,
        underlined && styles.underlined,
        style,
      ]}
      maxFontSizeMultiplier={appStyles.maxFontSizeMultiplier}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    flexWrap: "wrap",
    flexShrink: 1,
    color: appStyles.colorGray_66768d,
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    lineHeight: 24,
  },
  h1: {
    fontSize: 40,
    lineHeight: 48,
    fontFamily: "Nunito_600SemiBold",
    color: appStyles.colorBlue_3d527b,
  },
  h2: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: "Nunito_600SemiBold",
    color: appStyles.colorBlue_3d527b,
  },
  h3: {
    fontSize: 20,
    lineHeight: 24,
    fontFamily: "Nunito_600SemiBold",
    color: appStyles.colorBlue_3d527b,
  },
  smallText: {
    fontSize: 12,
    fontFamily: "Nunito_400Regular",
    lineHeight: 18,
  },
  bold: {
    fontFamily: "Nunito_700Bold",
  },
  semibold: {
    fontFamily: "Nunito_600SemiBold",
  },
  underlined: { textDecorationLine: "underline" },
});
