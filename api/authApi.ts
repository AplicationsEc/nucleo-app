import AsyncStorage from "@react-native-async-storage/async-storage";

export const authApi = {
  login: async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);

    return {
      success: true,
      user: {
        username,
        id: "123",
      },
    };
  },

  logout: async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("password");
  },

  getUser: async () => {
    const username = await AsyncStorage.getItem("username");
    const password = await AsyncStorage.getItem("password");

    return { username, password };
  },

  register: async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
  },
};
