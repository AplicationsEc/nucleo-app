import ModalProducto from "@/src/components/Productos/ModalProducto";
import ProductoCard from "@/src/components/Productos/ProductoCard";
import { useProudctosDBList } from "@/src/database/services/productos-db/useProudctosDBList";
import { IProducto } from "@/src/models/IProducto";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function ProductosAddRecientes() {
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProducto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, error } = useProudctosDBList();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProductoCard
            producto={item}
            viewEliminar={true}
            viewBtnEditar={true}
            onPress={() => {
              setProductoSeleccionado(item);
              setModalVisible(true);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <ModalProducto
        visible={modalVisible}
        producto={productoSeleccionado}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}
