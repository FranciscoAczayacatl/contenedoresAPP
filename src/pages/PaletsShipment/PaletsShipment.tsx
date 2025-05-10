/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { PaletsShipmentResponses, PalletProps } from '../PaletsShipment/types/types';
import Header from '../PaletsShipment/components/Header';
import TableRow from '../PaletsShipment/components/TableRow';
import SummaryRow from '../PaletsShipment/components/SummaryRow';
import SelectedProductTable from '../PaletsShipment/components/SelectedProductTable';
import axios from 'axios';
import { styles } from '../PaletsShipment/styles/styles';
import { RootStackParamList } from '../../../App';
import LottieView from 'lottie-react-native';

type ViewShipmentRouteProp = RouteProp<RootStackParamList, 'PaletsShipment'>;

const PaletsShipment: React.FC = () => {
  const route = useRoute<ViewShipmentRouteProp>();
  const { id, facturado } = route.params as { id: number , facturado:string };

  const [databd, setDatadb] = useState<PaletsShipmentResponses | null>(null);
  const [data, setData] = useState<PalletProps[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://172.16.1.85:3000/productos-pallet/${id}`);
        setDatadb(response.data);
        const transformedData = response.data.datos.map((item: { Identificador: any; Cajas: any; Kilogramos: any; Temperatura: any; IdPalletDistribucion: any; }) => ({
          pallet: item.Identificador,
          Cant: item.Cajas,
          Kilogramos: item.Kilogramos,
          Farenheit: item.Temperatura,
          Id: item.IdPalletDistribucion,
        }));
        setData(transformedData);
      } catch (error) {
        console.error('Error al cargar datos', error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSort = (key: keyof PalletProps) => {
    const sorted = [...data].sort((a, b) =>
      a[key]! < b[key]! ? -1 : a[key]! > b[key]! ? 1 : 0
    );
    setData(sorted);
    setSortBy(key);
  };

  const handleEdit = (index: number, value: string) => {
    const updated = [...data];
    updated[index].Farenheit = parseFloat(value);
    setData(updated);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRowId(id);
    const selectedPallet = databd?.datos.find((p: { IdPalletDistribucion: number; } )=> p.IdPalletDistribucion === id);
    setSelectedProducts(selectedPallet?.products || []);
  };
   if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <LottieView
            source={require('../../assets/animations/Animation.json')}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
          <Text style={{ marginTop: 20, fontSize: 16, color: '#406450' }}>Cargando...</Text>
        </View>
      );
    }

  return (
    <LinearGradient colors={['#406450', '#82CAA2']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.containTable}>
          <Header sortBy={sortBy} onSort={handleSort} />

          <ScrollView style={styles.scrollArea} nestedScrollEnabled>

          {data.map((item, index) => (
            <TableRow
              key={index}
              item={item}
              index={index}
              selectedRowId={selectedRowId}
              onSelectRow={handleSelectRow}
              onEdit={handleEdit}
            />
          ))}

          </ScrollView>
        </View>

        <SummaryRow
          pallets={databd?.conteo[0].Pallets || 0}
          cajas={databd?.conteo[0].Cajas || 0}
          kilogramos={databd?.conteo[0].Kilogramos || 0}
          onIconPress={() => {
            setSortBy('');
            setSelectedRowId(null);
            setSelectedProducts([]);
          }}
        />
        <View style={ styles.buttonsContainer}>
          <TouchableOpacity style = {facturado === 'Si' ? styles.buttonsDisable : styles.buttonadd} disabled={facturado?.toLowerCase() === 'si'} >
            <Image
              source={require('../../assets/add.png')}
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity style = {facturado === 'Si' ? styles.buttonsDisable : styles.buttonedit} disabled={facturado?.toLowerCase() === 'si'} >
            <Image
              source={require('../../assets/edit.png')}
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity style = {facturado === 'Si' ? styles.buttonsDisable : styles.buttonsave} disabled={facturado?.toLowerCase() === 'si'} >
            <Image
              source={require('../../assets/save.png')}
              style={styles.icons}
            />
          </TouchableOpacity>
          <TouchableOpacity style = {facturado === 'Si' ? styles.buttonsDisable : styles.buttondeleted} disabled={facturado?.toLowerCase() === 'si'} >
            <Image
              source={require('../../assets/delete.png')}
              style={styles.icons}
            />
          </TouchableOpacity>
        </View>
      <View style={styles.staticTable}>
        <Text style={styles.title}>Productos Empacados en Contenedor por Calibre:</Text>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.headerText]}>Calibre</Text>
          <Text style={[styles.cell, styles.headerText]}>Pallets</Text>
          <Text style={[styles.cell, styles.headerText]}>Cajas</Text>
          <Text style={[styles.cell, styles.headerText]}>Kg</Text>
        </View>
        {databd?.pedido.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{item.Calibre}</Text>
            <Text style={styles.cell}>{item.Pallets}</Text>
            <Text style={styles.cell}>{item.Cajas}</Text>
            <Text style={styles.cell}>{item.kilogramos}</Text>
          </View>
        ))}
      </View>

      {selectedProducts.length > 0 && (
          <SelectedProductTable products={selectedProducts} />
        )}
      </ScrollView>
    </LinearGradient>
  );
};

export default PaletsShipment;
