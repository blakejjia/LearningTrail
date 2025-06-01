import ThemedButton from "@/components/common/ThemedButton";
import { Category } from "@/store/models/category";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import tw from "twrnc";
import { ThemedIcon } from "../../common/ThemedIcon";
import { ThemedText } from "../../common/ThemedText";
import CategoryWidget from "../../common/category";

export default function CategorySelector({
  category,
  setCategory,
  categories,
}: {
  category: Category;
  setCategory: (category: Category) => void;
  categories: Category[];
}) {
  const [categoryOpen, setCategoryOpen] = useState(false);

  return (
    <>
      <ThemedButton onPress={() => setCategoryOpen(true)}>
        <ThemedIcon name="category" size={24} />
        <ThemedText>{category.name}</ThemedText>
      </ThemedButton>
      <Modal visible={categoryOpen} transparent animationType="slide">
        <View style={tw`flex-1 justify-end bg-black/50`}>
          <View style={tw`bg-white rounded-t-xl p-4 max-h-[50%]`}>
            <Text style={tw`text-lg font-bold mb-2`}>Select Category</Text>
            <ScrollView>
              {categories.map((cat) => (
                <Pressable
                  key={cat.id}
                  onPress={() => {
                    setCategory(cat);
                    setCategoryOpen(false);
                  }}
                  style={tw`p-3 border-b border-gray-200`}
                >
                  <CategoryWidget category={cat} />
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}
