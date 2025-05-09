import * as LocalAuthentication from "expo-local-authentication";
import { Alert, TouchableOpacity, Text } from "react-native";

export const autenticarHuella = async () => {
  const tieneHardware = await LocalAuthentication.hasHardwareAsync();
  const soportado =
    await LocalAuthentication.supportedAuthenticationTypesAsync();
  const biometriaDisponible = await LocalAuthentication.isEnrolledAsync();

  if (!tieneHardware || !biometriaDisponible) {
    Alert.alert(
      "Huella no disponible",
      "Este dispositivo no tiene huella configurada"
    );
    return;
  }

  const resultado = await LocalAuthentication.authenticateAsync({
    promptMessage: "Usa tu huella digital",
    fallbackLabel: "Usa código",
  });

  if (resultado.success) {
    Alert.alert("Autenticado", "Huella reconocida correctamente");
    // Aquí puedes cambiar el estado:
    return true;
  } else {
    Alert.alert("Falló la autenticación", "Inténtalo de nuevo");
    return false;
  }
};
