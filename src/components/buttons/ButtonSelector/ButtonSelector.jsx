import React, { useState } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { Icon } from "../../icons/Icon";
import { Avatar } from "../../avatars/Avatar";

import { appStyles } from "#styles";

/**
 * ButtonSelector
 *
 * ButtonSelector component
 *
 * @return {jsx}
 */
export const ButtonSelector = ({
  label,
  iconName,
  avatar,
  disabled = false,
  style,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={({ pressed }) => {
        return [
          styles.btn,
          pressed && styles.btnPressed,
          disabled && styles.btnDisabled,
          appStyles.shadow3,
          style,
        ];
      }}
      disabled={disabled}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      {...props}
    >
      <View style={styles.textContainer}>
        {iconName && (
          <View style={styles.leftIcon}>
            <Icon name={iconName} color="#A6B4B8" size="md" />
          </View>
        )}
        {!iconName && avatar && <Avatar style={styles.avatar} image={avatar} />}
        <Text style={[styles.text, isPressed && styles.textPressed]}>
          {label}
        </Text>
      </View>
      <Icon name="arrow-chevron-forward" color="#3D527B" size="md" />
    </Pressable>
  );
};

// define your styles
const styles = StyleSheet.create({
  btn: {
    backgroundColor: appStyles.colorWhite_ff,
    borderColor: "transparent",
    borderWidth: 1,
    borderRadius: 24,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "92%",
    maxWidth: 420,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  btnPressed: {
    borderColor: appStyles.colorPrimaryPressed_0c5f7a,
  },

  btnDisabled: {
    opacity: 0.4,
  },

  avatar: {
    marginRight: 8,
  },

  leftIcon: {
    paddingVertical: 4,
  },

  text: {
    color: appStyles.colorBlack_37,
    marginLeft: 11,
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
  },

  textPressed: {
    color: appStyles.colorPrimaryPressed_0c5f7a,
    fontFamily: "Nunito_700Bold",
  },

  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

ButtonSelector.propTypes = {
  /**
   * Label to render in the ButtonSelector component
   */
  label: PropTypes.string,

  /**
   * Name of the left icon to render
   */
  iconName: PropTypes.string,

  /**
   * URL to the image that needs to be displayed
   */
  avatar: PropTypes.string,

  /**
   * Is the button disabled?
   */
  disabled: PropTypes.bool,

  /**
   * Additional styles to pass
   * */
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),

  /**
   * Additional props to pass
   **/
  props: PropTypes.object,
};
