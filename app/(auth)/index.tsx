import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { authApi } from "@/api/authApi";
import { router } from "expo-router";
import { useGetUser } from "@/hooks/auth/useAuthUser";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { data: user, isLoading } = useGetUser();

  useEffect(() => {
    const userName = user?.username;
    if (isLoading == false && userName) {
      router.push("/(tabs)");
    }
  }, [isLoading]);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      alert("Please enter a username and password");
      return;
    }
    await authApi.login(username, password);
    router.push("/(tabs)");
  };

  if (isLoading) {
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="title" style={styles.title}>
          Login
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Sign In</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#1a1a1a",
  },
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    color: "#fff",
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
