import { useThemeColor } from "@/hooks/useThemeColor";
import { MaterialIcons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type ThemedIconProps = Omit<
  ComponentProps<typeof MaterialIcons>,
  "color"
> & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedIcon({
  lightColor,
  darkColor,
  ...rest
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "icon");
  return <MaterialIcons color={color} {...rest} />;
}
