import { ThemedIcon } from "@/components/common/ThemedIcon";
import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import { ThemedText } from "./ThemedText";

export enum ThemedButtonType {
  primary,
  secondary,
  normal,
}
interface ThemedButtonProps {
  onPress: () => void;
  title?: string;
  type?: ThemedButtonType;
  disabled?: boolean;
}

export default function ThemedButton({
  onPress,
  title,
  type = ThemedButtonType.normal,
  disabled = false,
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={tw`p-4 rounded-lg border-2 border-gray-400 justify-center items-center`}
      onPress={onPress}
    >
      {title ? (
        <ThemedText style={tw`text-lg`}>{title}</ThemedText>
      ) : (
        <ThemedIcon name="chevron-right" size={24} />
      )}
    </TouchableOpacity>
  );
}
