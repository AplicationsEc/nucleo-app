import HeaderProductos from "@/src/components/Productos/HeaderProductos";
import ModalProducto from "@/src/components/Productos/ModalProducto";
import ProductoCard from "@/src/components/Productos/ProductoCard";
import { useProudctosDBList } from "@/src/database/services/productos-db/useProudctosDBList";
import { IProducto } from "@/src/models/IProducto";
import { useMemo, useState } from "react";
import { View, FlatList, ActivityIndicator, SafeAreaView } from "react-native";

export default function ProductoListadoWebScreen() {
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<IProducto | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { data, isLoading } = useProudctosDBList();

  const productosSync = useMemo(() => {
    if (!data) return [];
    return data.filter((producto) => producto.sincronizado);
  }, [data]);

  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "white", paddingTop: 40 }}
      >
        <HeaderProductos
          verBtnSubir={false}
          titulo="Productos cargados en el catalogo web"
        />
        <FlatList
          key={productosSync.length}
          data={productosSync}
          renderItem={({ item }) => (
            <ProductoCard
              producto={item}
              viewEliminar={false}
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
      </SafeAreaView>
    );
  }
}
