import { TouchableOpacity } from "react-native";
import tw from "twrnc";
import { ThemedView } from "./ThemedView";

interface ThemedButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export default function ThemedButton({ children, onPress }: ThemedButtonProps) {
  return (
    <TouchableOpacity
      style={tw`p-4 rounded-lg border-2 justify-center items-center`}
      onPress={onPress}
    >
      <ThemedView>{children}</ThemedView>
    </TouchableOpacity>
  );
}
