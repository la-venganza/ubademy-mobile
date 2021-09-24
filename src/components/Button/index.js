import React from "react";
import { Text, TouchableOpacity } from "react-native";
function Button({ children }) {
  return (
    <TouchableOpacity>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
}
export default Button;