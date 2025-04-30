import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUserLogin } from "@/models/IUserLogin";
import { configApp } from "@/helper/constants";
export const authApi = {
  login: async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === configApp.user && password === configApp.password) {
      await AsyncStorage.setItem("username", username);
      await AsyncStorage.setItem("password", password);

      return {
        success: true,
        user: {
          username,
          id: "123",
        },
      };
    } else {
      return {
        success: false,
        message: "Usuario o contraseña incorrectos",
      };
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("username");
    await AsyncStorage.removeItem("password");
  },

  getUser: async (): Promise<IUserLogin> => {
    const username = await AsyncStorage.getItem("username");
    const password = await AsyncStorage.getItem("password");

    return { username: username!, password: password! };
  },

  register: async (username: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
  },
};
