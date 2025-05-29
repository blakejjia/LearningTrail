import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SystemFeedback } from "@/store/authSlide";
import useStore from "@/store/store";
import { useState } from "react";
import { TextInput } from "react-native";
import tw from "twrnc";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shortId, setShortId] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [systemFeedback, setSystemFeedback] = useState<SystemFeedback | null>(
    null
  );

  return (
    <ThemedView style={tw`flex-1 items-center justify-center`}>
      <ThemedView style={tw`w-full p-4 gap-4`}>
        <ThemedText style={tw`text-2xl font-bold`}>Signup</ThemedText>
        <TextInput
          placeholder="Enter username"
          value={shortId}
          style={tw`border-2 border-gray-300 rounded-md p-4`}
          textContentType="username"
          autoComplete="username"
          onChangeText={setShortId}
        />
        <TextInput
          placeholder="Enter Email or Usr Id"
          value={email}
          style={tw`border-2 border-gray-300 rounded-md p-4`}
          textContentType="username"
          autoComplete="username"
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          style={tw`border-2 border-gray-300 rounded-md p-4`}
          textContentType="password"
          autoComplete="password"
          onChangeText={setPassword}
        />

        <ThemedButton
          onPress={async () => {
            setIsLoading(true);
            const result = await useStore
              .getState()
              .signup(email, password, shortId);
            setSystemFeedback(result);
            setIsLoading(false);
          }}
        >
          <ThemedText>{isLoading ? "Loading..." : "Signup"}</ThemedText>
        </ThemedButton>
        {systemFeedback?.success === false && (
          <ThemedText style={tw`text-red-500`}>
            {systemFeedback.message}
          </ThemedText>
        )}
        {systemFeedback?.success === true && (
          <ThemedText style={tw`text-green-500`}>
            {systemFeedback.message}
          </ThemedText>
        )}
      </ThemedView>
    </ThemedView>
  );
}
