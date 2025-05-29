import { MaterialIcons } from "@expo/vector-icons";

// 类型安全：所有 MaterialIcons 图标的名称
export type Symbols = keyof typeof MaterialIcons.glyphMap;
