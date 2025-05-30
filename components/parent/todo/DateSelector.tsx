import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../../common/ThemedIcon";
import DateWidget from "../../common/date";
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
        <DateWidget date={new Date(date)} />
      </Pressable>
      {dateOpen && (
        <DateTimePicker
          value={new Date(date)}
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
