import { Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { router } from "expo-router";
import { Colors } from "@/constants/Colors";

export default function ModalLayout() {
  const colorScheme = useColorScheme();
  console.log("MODAL LAYOUT ACTIVADO");

  return (
    <Stack>
      <Stack.Screen
        name="add-producto"
        options={{
          title: "Nuevo producto",
          headerTitleAlign: "left",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name="close"
                size={28}
                color={Colors[colorScheme ?? "light"].tint}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
}
