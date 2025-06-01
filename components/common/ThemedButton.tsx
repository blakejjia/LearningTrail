import { ThemedIcon } from "@/components/common/ThemedIcon";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import tw from "twrnc";
import { ThemedText } from "./ThemedText";

export enum ThemedButtonType {
  primary,
  secondary,
  normal,
  small,
}
interface ThemedButtonProps {
  onPress?: () => void;
  title?: string;
  type?: ThemedButtonType;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default function ThemedButton({
  onPress,
  title,
  type = ThemedButtonType.normal,
  style,
  disabled = false,
  children,
}: ThemedButtonProps) {
  if (type === ThemedButtonType.small) {
    return (
      <TouchableOpacity
        style={tw`p-2 justify-center items-center`}
        onPress={onPress}
      >
        {title ? (
          <ThemedText style={tw`text-sm`}>{title}</ThemedText>
        ) : (
          <ThemedIcon name="chevron-right" size={24} />
        )}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[
        tw`rounded-xl p-2 border-2 border-gray-200 flex-row justify-center gap-2 w-full`,
        style,
      ]}
      onPress={onPress}
    >
      {children ? (
        children
      ) : (
        <>
          {title ? (
            <ThemedText style={tw`text-lg font-bold text-gray-600`}>
              {title}
            </ThemedText>
          ) : (
            <ThemedIcon name="chevron-right" size={24} />
          )}
        </>
      )}
    </TouchableOpacity>
  );
}
