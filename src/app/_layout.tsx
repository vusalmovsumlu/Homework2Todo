import ToDoList from "@/components/ToDoList";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <ToDoList />
    </View>
  );
}