import ThemedButton from "@/components/common/ThemedButton";
import { ThemedView } from "@/components/common/ThemedView";
import DurationWidget from "@/components/common/duration";
import { useStore } from "@/store/store";
import { Text, View } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../../common/ThemedIcon";
import { ThemedText } from "../../common/ThemedText";
import CategoryWidget from "../../common/category";
export default function TodoTile({
  uuid,
  onPress,
}: {
  uuid: string;
  onPress?: () => void;
}) {
  const todo = useStore((state) => state.getTodo(uuid));
  const updateTodo = useStore((state) => state.updateTodo);

  if (!todo || !todo.details) {
    return (
      <ThemedView style={tw`m-4 rounded-2xl`}>
        <View style={tw`flex-1`}>
          <Text>Loading...</Text>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={tw`p-4 rounded-lg`}>
      <ThemedButton onPress={onPress} style={tw`p-4`}>
        {/* left hand-side */}
        <ThemedView style={tw`flex-1 flex-col`}>
          <ThemedText
            type={todo.details?.completed ? "strikethrough" : "subtitle"}
          >
            {todo.details?.title}
          </ThemedText>
          <ThemedView style={tw`flex-row items-center gap-2`}>
            {todo.details?.totalTime && (
              <DurationWidget
                duration={todo.details?.totalTime}
                isCompleted={todo.details?.completed}
              />
            )}
            {todo.category && (
              <CategoryWidget
                category={todo.category}
                isCompleted={todo.details?.completed}
              />
            )}
          </ThemedView>
        </ThemedView>

        {/* right hand-side, control if this is completed or not */}
        <ThemedView style={tw`flex-1 flex-col items-end justify-center`}>
          {todo.details?.completed ? (
            <ThemedButton
              style={tw`w-10`}
              onPress={() => {
                updateTodo(todo.id, {
                  ...todo,
                  details: {
                    ...todo.details,
                    completed: false,
                  },
                });
              }}
            >
              <ThemedIcon name="done-all" size={20} />
            </ThemedButton>
          ) : todo.details?.identifiedCompleted ? (
            <ThemedButton
              style={tw`w-10`}
              onPress={() => {
                updateTodo(todo.id, {
                  ...todo,
                  details: {
                    ...todo.details,
                    identifiedCompleted: false,
                  },
                });
              }}
            >
              <ThemedIcon name="check" size={20} />
            </ThemedButton>
          ) : (
            <ThemedButton
              style={tw`w-10`}
              onPress={() => {
                updateTodo(todo.id, {
                  ...todo,
                  details: {
                    ...todo.details,
                    completed: true,
                  },
                });
              }}
            >
              <ThemedIcon name="close" size={20} />
            </ThemedButton>
          )}
        </ThemedView>
      </ThemedButton>
    </ThemedView>
  );
}
