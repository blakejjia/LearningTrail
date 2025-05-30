import { ThemedText } from "./ThemedText";

export default function DateWidget({ date }: { date: Date }) {
  return <ThemedText>{date.toLocaleDateString()}</ThemedText>;
}
