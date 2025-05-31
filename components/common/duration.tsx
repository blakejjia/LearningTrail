import { Duration, durationUtils } from "@/store/models/Duratoin";
import { ThemedText } from "./ThemedText";

export default function DurationWidget({ duration }: { duration?: Duration }) {
  if (!duration || durationUtils.isZero(duration)) {
    return <ThemedText>Unavaliable</ThemedText>;
  }
  return <ThemedText>{durationUtils.toString(duration)}</ThemedText>;
}
