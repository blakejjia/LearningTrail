import { ThemedIcon } from "@/components/common/ThemedIcon";
import { ThemedText } from "@/components/common/ThemedText";
import { ThemedView } from "@/components/common/ThemedView";
import TodoTile from "@/components/student/todo/TodoTile";
import { useStore } from "@/store/store";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import tw from "twrnc";
import TodoDetail from "../subpages/todo_detail";

export default function TodoItem() {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["10%", "25%", "50%"], []);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const toDoList = useStore((state) => state.toDoList);

  return (
    <View style={tw`flex-1`}>
      <ScrollView>
        <ThemedView>
          {toDoList.map((item) => (
            <TodoTile
              key={item.id}
              uuid={item.id}
              onPress={() => {
                setSelectedId(item.id);
                sheetRef.current?.expand();
              }}
            />
          ))}
        </ThemedView>

        <View style={tw`p-4 items-center justify-center w-full`}>
          <Pressable
            onPress={() => {
              setSelectedId(null);
              sheetRef.current?.expand();
            }}
          >
            <ThemedView
              style={tw`p-4 gap-2 items-center justify-center w-2/3 rounded-2xl flex-row`}
            >
              <ThemedIcon name="add" size={24} />
              <ThemedText>Add a new todo</ThemedText>
            </ThemedView>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom sheet */}
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
      >
        <BottomSheetView>
          <TodoDetail id={selectedId} key={selectedId} />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
