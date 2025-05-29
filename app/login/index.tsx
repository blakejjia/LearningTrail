import ThemedButton from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useStore } from "@/store/store";
import { SystemFeedback } from "@/store/utils";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import tw from "twrnc";

export default function index() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [systemFeedback, setSystemFeedback] = useState<SystemFeedback | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    useStore.getState().connectServer();
  }, []);

  useEffect(() => {
    if (systemFeedback?.success === true) {
      router.push("/(tabs)/todo");
    }
  }, [systemFeedback]);

  return (
    <ThemedView style={tw`flex-1 items-center justify-center`}>
      <ThemedView style={tw`w-full p-4 gap-4`}>
        <ThemedText style={tw`text-2xl font-bold`}>Welcome!</ThemedText>
        <ThemedText>Please enter your email and password to login.</ThemedText>
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
          value={pwd}
          style={tw`border-2 border-gray-300 rounded-md p-4`}
          textContentType="password"
          autoComplete="password"
          onChangeText={setPwd}
        />
        {systemFeedback?.success === false && (
          <ThemedText style={tw`text-red-500`}>
            {systemFeedback.message}
          </ThemedText>
        )}
        <>
          <ThemedButton
            onPress={async () => {
              setIsLoading(true);
              const result = await useStore.getState().login(email, pwd);
              setSystemFeedback(result);
              setIsLoading(false);
            }}
          >
            <ThemedText>{isLoading ? "Loading..." : "Login"}</ThemedText>
          </ThemedButton>
          <ThemedText style={tw`text-center text-gray-500`}>
            {" "}
            --- or ---{" "}
          </ThemedText>
          <ThemedButton
            onPress={() => {
              router.push("/login/signup");
            }}
          >
            <ThemedText>Signup</ThemedText>
          </ThemedButton>
        </>
      </ThemedView>
    </ThemedView>
  );
}
