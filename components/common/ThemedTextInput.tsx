import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import tw from "twrnc";
import { ThemedText } from "./ThemedText";

export enum ThemedTextInputType {
  TextInput = "TextInput",
  TextInputMultiline = "TextInputMultiline",
}

export default function ThemedTextInput({
  value,
  onChangeText,
  placeholder,
  style,
  type,
  props,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  style?: StyleProp<TextStyle>;
  type?: ThemedTextInputType;
  props?: TextInputProps;
}) {
  return (
    <View style={tw`flex-col gap-2`}>
      <ThemedText type="defaultSemiBold">{placeholder}</ThemedText>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[style, tw`rounded-2xl border-2 border-gray-300 bg-gray-100`]}
        multiline={type === ThemedTextInputType.TextInputMultiline}
        {...props}
      />
    </View>
  );
}
