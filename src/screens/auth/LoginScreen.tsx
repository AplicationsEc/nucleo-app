import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { Button, Card, Icon, Text, TextInput } from "react-native-paper";
import { Dimensions } from "react-native";
import { autenticarHuella } from "../../api/localAuth";
import { useProudctosList } from "@/src/services/productos/useProudctosList";
import { useProductosDBCreate } from "@/src/database/services/productos-db/useProductosDBCreate";

const { width, height } = Dimensions.get("window");

export default function LoginScreen() {
  const [formasLogin, setFormasLogin] = useState<string>("");
  const { data: productos } = useProudctosList();
  const { mutateAsync: guardarProductoDB } = useProductosDBCreate();
  const { login } = useAuth();

  const handleLogin = async () => {
    const resultado = await autenticarHuella();
    if (resultado) {
      //   const exito = await sincronizarProductos();
      // if (exito) login();
      login();
    }
  };

  const sincronizarProductos = async (): Promise<boolean> => {
    if (!productos) return false;

    try {
      for (const producto of productos) {
        await guardarProductoDB(producto); // espera cada inserción
      }
      return true;
    } catch (error) {
      console.error("Error sincronizando productos", error);
      return false;
    }
  };
  return (
    <ImageBackground
      source={require("@/assets/images/login.png")}
      style={styles.background}
      resizeMode="stretch"
    >
      <View style={styles.content}>
        {formasLogin === "USUARIO" && (
          <View
            style={{
              width: "90%",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "white",
              padding: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                paddingBottom: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
              >
                Ingresar Usuario
              </Text>
            </View>
            <TextInput
              style={styles.input}
              label="Usuario"
              underlineColor="gray"
              activeUnderlineColor="gray"
            />
            <TextInput
              style={styles.input}
              label="Contraseña"
              underlineColor="gray"
              secureTextEntry={true}
              activeUnderlineColor="gray"
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 25,
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <Button
                mode="outlined"
                buttonColor="transparent"
                textColor="white"
                onPress={() => {
                  setFormasLogin("");
                }}
              >
                Cancelar
              </Button>
              <Button
                mode="contained"
                buttonColor="white"
                textColor="black"
                onPress={() => {}}
              >
                Ingresar
              </Button>
            </View>
          </View>
        )}
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("Test ssssssssssssss passed");
              setFormasLogin("USUARIO");
            }}
          >
            <Icon source="account" size={36} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              //setFormasLogin("FINGERPRINT");
              handleLogin();
            }}
          >
            <Icon source="fingerprint" size={36} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: width,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center", // centra vertical
    alignItems: "center", // centra horizontal
    backgroundColor: "rgba(0, 0, 0, 0.3)", // opcional para oscurecer el fondo
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  // content: {
  //   backgroundColor: "transparent",
  //   width: "100%",
  // },
  card: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    marginBottom: 20,
    width: "100%",
    backgroundColor: "white",
  },
  actions: {
    paddingTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center", // Opcional: centra verticalmente también
    width: "100%", // Asegura que ocupe todo el ancho disponible
  },
  button: {
    marginHorizontal: 30,
  },
});
