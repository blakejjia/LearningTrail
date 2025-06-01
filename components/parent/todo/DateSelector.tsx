import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
import DateWidget from "../../common/date";
import ThemedButton from "../../common/ThemedButton";
import { ThemedIcon } from "../../common/ThemedIcon";
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
      <ThemedButton onPress={() => setDateOpen(true)}>
        <ThemedIcon name="calendar-today" size={24} />
        <DateWidget date={new Date(date)} />
      </ThemedButton>
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
