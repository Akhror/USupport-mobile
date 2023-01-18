import React from "react";

import { Screen } from "#components";
import { Login as LoginBlock } from "#blocks";

/**
 * Login
 *
 * Login screen
 *
 * @returns {JSX.Element}
 */
export const Login = ({ navigation }) => {
  return (
    <Screen>
      <LoginBlock navigation={navigation} />
    </Screen>
  );
};
