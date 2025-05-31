import ThemedButton from "@/components/common/ThemedButton";
import { ThemedView } from "@/components/common/ThemedView";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput } from "react-native";
import tw from "twrnc";

const CORRECT_PASSWORD = "123456";

export default function PasswordGate() {
  const router = useRouter();
  const { redirectTo } = useLocalSearchParams<{ redirectTo: string }>();
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (password === CORRECT_PASSWORD) {
      if (redirectTo) {
        router.replace(redirectTo as any); // 替换掉密码页，防止后退跳过验证
      } else {
        Alert.alert("Error", "No redirect page specified");
      }
    } else {
      Alert.alert("Password is incorrect", "Please enter the correct password");
    }
  };

  return (
    <ThemedView style={tw`flex-1 gap-8 w-full p-10`}>
      <Text style={tw`text-2xl font-bold`}>Please enter the password</Text>
      <TextInput
        style={tw`border-2 border-gray-300 rounded-md p-2 h-15`}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <ThemedButton onPress={handleSubmit} title="Confirm" />
    </ThemedView>
  );
}
