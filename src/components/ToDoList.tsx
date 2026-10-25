
import { useState } from "react";
import {
  View, Text, TextInput, Pressable,
  FlatList, Alert, StyleSheet
} from "react-native";

type Task = {
  id: number;
  name: string;
  done: boolean;
};

export default function ToDoList() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask() {
    if (text.trim() === "") {
      Alert.alert("Xəta", "Tapşırıq yazın!");
      return;
    }

    setTasks([
      ...tasks,
      { id: Date.now(), name: text.trim(), done: false }
    ]);
    setText("");
  }

  function deleteTask(id: number) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function checkTask(id: number) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ToDoList</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Tapşırıq yaz..."
          value={text}
          onChangeText={setText}
        />

        <Pressable onPress={addTask} style={styles.button}>
          <Text style={{ color: "white" }}>Əlavə et</Text>
        </Pressable>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.task}>
            <Pressable onPress={() => checkTask(item.id)}>
              <Text style={styles.icon}>
                {item.done ? "☑" : "☐"}
              </Text>
            </Pressable>

            <Text style={{
              flex: 1,
              textDecorationLine: item.done ? "line-through" : "none"
            }}>
              {item.name}
            </Text>

            <Pressable onPress={() => deleteTask(item.id)}>
              <Text style={styles.icon}>🗑</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#333",
    padding: 12,
    justifyContent: "center",
    borderRadius: 8,
  },
  task: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  icon: {
    fontSize: 24,
  },
});
