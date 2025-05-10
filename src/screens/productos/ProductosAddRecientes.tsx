import ModalProducto from "@/src/components/Productos/ModalProducto";
import ProductoCard from "@/src/components/Productos/ProductoCard";
import { useProudctosDBList } from "@/src/database/services/productos-db/useProudctosDBList";
import { IProducto } from "@/src/models/IProducto";
import { useMemo, useState } from "react";
import { View, Text, FlatList } from "react-native";

export default function ProductosAddRecientes() {
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProducto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading, error } = useProudctosDBList();

  const productosSync = useMemo(() => {
    if (!data) return [];
    return data.filter((producto) => !producto.sincronizado);
  }, [data]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        data={productosSync}
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
