import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../ThemedIcon";
import { ThemedText } from "../ThemedText";
export default function DateSelector({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <>
      <Pressable
        style={tw`rounded-xl p-2 border-2 border-gray-200 flex-row items-center gap-2`}
        onPress={() => setDateOpen(true)}
      >
        <ThemedIcon name="calendar-today" size={24} />
        <ThemedText>{date ? date.toLocaleDateString() : "Date"}</ThemedText>
      </Pressable>
      {dateOpen && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(_, selectedDate) => {
            setDateOpen(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </>
  );
}
