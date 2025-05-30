import {
  createDuration,
  Duration,
  durationUtils,
} from "@/store/models/Duratoin";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../../common/ThemedIcon";
import { ThemedText } from "../../common/ThemedText";

export default function TimeSelector({
  time,
  setTime,
}: {
  time: Duration;
  setTime: (time: Duration) => void;
}) {
  const [timeOpen, setTimeOpen] = useState(false);
  // 解析当前 time
  const [minute, setMinute] = useState(
    time ? durationUtils.toMinutes(time) : 0
  );
  const [second, setSecond] = useState(
    time ? durationUtils.toSeconds(time) : 0
  );

  // 当用户点击 Done 时，更新外部 time
  const handleDone = () => {
    setTime(createDuration.fromSeconds(minute * 60 + second));
    setTimeOpen(false);
  };

  return (
    <>
      <Pressable
        style={tw`rounded-xl p-2 border-2 border-gray-200 flex-row items-center gap-2`}
        onPress={() => setTimeOpen(true)}
      >
        <ThemedIcon name="timer" size={24} />
        <ThemedText>{time ? durationUtils.toString(time) : "Time"}</ThemedText>
      </Pressable>
      <Modal visible={timeOpen} transparent animationType="slide">
        <View style={tw`flex-1 justify-center items-center bg-black/50`}>
          <View style={tw`bg-white p-4 rounded-xl flex-row`}>
            <ScrollView
              style={tw`h-48 w-20`}
              showsVerticalScrollIndicator={false}
            >
              {[...Array(60).keys()].map((m) => (
                <Pressable key={m} onPress={() => setMinute(m)}>
                  <Text
                    style={tw`text-xl text-center py-2 ${
                      minute === m ? "font-bold text-blue-500" : ""
                    }`}
                  >
                    {m} min
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <ScrollView
              style={tw`h-48 w-20`}
              showsVerticalScrollIndicator={false}
            >
              {[...Array(60).keys()].map((s) => (
                <Pressable key={s} onPress={() => setSecond(s)}>
                  <Text
                    style={tw`text-xl text-center py-2 ${
                      second === s ? "font-bold text-blue-500" : ""
                    }`}
                  >
                    {s} sec
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
          <Pressable onPress={handleDone} style={tw`mt-4`}>
            <Text style={tw`text-lg text-white`}>Done</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}
