/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import LottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import {Alert, Button, Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet,  Text,  TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AgriculturalBoxPartner, OpenOrder } from './types';
import { detailRequest } from '../ViewShipment/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import { PALLETLAST, AGRICULTURAL_BOX_PARTNERS, ORDERS_OPEN, PEDIDO_DETALLE, PALLETS } from '@env';


type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateShipment'>;




const CreateShipment = () => {
  const [textPedido, setTextPedido] = useState('');
  const [textCajas, setTextCajas] = useState('');
  const [textPedidoFolio, setTextPedidoFolio] = useState('');
  const [textCliente, setTextCliente] = useState('');
  const [textObservaciones, setTextObservaciones] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisiblePedido, setModalVisiblePedido] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingtwo, setLoadingtwo] = useState(true);
  const [loadingtre, setLoadingtre] = useState(true);
  const fecha = new Date();
  const [databdFolio, setDataFolio] = useState(0);
  const [databdCajas, setDataCajas] = useState<AgriculturalBoxPartner[]>([]);
  const [databdOpen, setDataOpen] =  useState<OpenOrder[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
  const [databdDetailRequest, setDatadbDetailRequest] = useState<detailRequest []>([]);
  const [cajas, setcajas] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

const navigation = useNavigation<NavigationProp>();

  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get(PALLETLAST, {
          params: {
            month: mes,
            year: anio,
          },
        });
        setDataFolio(response.data?.IdPallet);
      } catch (error) {
        console.error('Error al cargar datos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mes, anio]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(AGRICULTURAL_BOX_PARTNERS);
        setDataCajas(response.data);
      } catch (error) {
        console.error('Error al cargar datos', error);
      } finally {
        setLoadingtwo(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ORDERS_OPEN);
        setDataOpen(response.data);
      } catch (error) {
        console.error('Error al cargar datos', error);
      } finally {
        setLoadingtre(false);
      }
    };

    fetchData();
  }, []);




  const fechaComoString = `${dia}/${mes}/${anio}`;

  const [selected, setSelected] = useState<number | null>(null);

  const handlePress = (clave: number) => {
    if (selected === clave) {
      setSelected(null);
    } else {
      setSelected(clave);
    }
  };

  const fetchDataPedidoDetalle = async (orderId: number) => {
    setLoadingtwo(true);
    try {
      const response = await axios.get(PEDIDO_DETALLE, {
        params: {
          idPedido: orderId,
        },
      });
      setDatadbDetailRequest(response.data);
    } catch (error) {
      console.error('Error al cargar pedido detalle', error);
    }
    finally {
      setLoadingtwo(false);
    }
  };

  const handleOrderPress = async(orderId: number, Folio:string, Nombre:string,Observaciones:string) => {
    if (selectedOrder === orderId) {
      setSelectedOrder(null);
      setTextPedido('');
      setTextPedidoFolio('');
      setTextCliente('');
      setTextObservaciones('');
      setDatadbDetailRequest([]);
    } else {
      setSelectedOrder(orderId);
      setTextPedidoFolio(Folio);
      setTextCliente(Nombre);
      setTextObservaciones(Observaciones);
      await fetchDataPedidoDetalle(orderId);
    }
  };

 const handleOrderPressInsert = async () => {
  console.log('ENTRO');
  const pedido = Number(textPedido);
    console.log(
    {IdPallet: folio,
      IdPedido: pedido,
      Observaciones: textObservaciones,
      IdPartnerIfcoNo: cajas}
  );
  if (!folio || !textPedido) {
    console.warn('Por favor, completa todos los campos antes de continuar.');
    return;
  }

  if (isNaN(pedido)) {
    console.warn('El campo pedido debe ser un número válido.');
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await axios.post(PALLETS, {
      IdPallet: folio,
      IdPedido: pedido,
      Observaciones: textObservaciones,
      IdPartnerIfcoNo: cajas,
    });
    setTextPedido('');
    setTextObservaciones('');
    setcajas(0);
    console.log('Respuesta del servidor:', response.data);

    Alert.alert(
  'Éxito',
  'El embarque se creó correctamente.',
  [
    {
      text: 'OK',
      onPress: () => navigation.replace('Menu'), // Recarga la pantalla
    },
  ],
  { cancelable: false } 
);
  } catch (error) {
    console.error('Error al hacer POST:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  const selectedPartner = databdCajas.find(
    i => i.IdPartnerIfcoNo === selected
  );

  if (loading && loadingtwo && loadingtre || isSubmitting) {
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

  const folio = databdFolio + 1;

  return (
   <>
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
      {/* Fondo degradado */}
      <LinearGradient
        colors={['#82CAA2', '#5a9276']}
        style={[styles.container, { position: 'absolute', top: 0, left: 0, zIndex: 0 }]}
      />

      {/* Contenido principal */}
      <View style={styles.containerForm}>
        <View style={styles.conainerInputAndLabel}>
          {/* FOLIO Y FECHA */}
          <View style={styles.folioFecha}>
            <View>
              <Text>Folio:</Text>
              <TextInput
                placeholderTextColor="#888"
                style={styles.input}
                placeholder="FOLIO"
                value={folio.toString()}
                editable={false}
              />
            </View>
            <View>
              <Text>Fecha:</Text>
              <TextInput
                placeholderTextColor="#888"
                style={styles.input}
                placeholder="Fecha"
                value={fechaComoString}
                editable={false}
              />
            </View>
          </View>

          {/* PEDIDO Y FOLIO PEDIDO */}
          <View style={styles.inputbasePedido}>
            <View>
              <Text>Pedido No°:</Text>
              <View style={styles.inputContainerPedido}>
                <TextInput
                  placeholder=""
                  style={styles.inputPedido}
                  placeholderTextColor="#ccc"
                  value={textPedido}
                  onChangeText={setTextPedido}
                  keyboardType="numeric"
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.touchablePedido}
                  onPress={() => setModalVisiblePedido(true)}
                >
                  <Image source={require('../../assets/search.png')} style={styles.iconPedido} />
                </TouchableOpacity>
              </View>
            </View>

            <View>
              <Text>Folio Pedido:</Text>
              <TextInput
                placeholderTextColor="#888"
                style={styles.inputFolioPedido}
                editable={false}
                value={textPedidoFolio}
                onChangeText={setTextPedidoFolio}
              />
            </View>
          </View>

          {/* CLIENTE */}
          <View style={styles.cliente}>
            <Text>Cliente:</Text>
            <TextInput
              placeholderTextColor="#888"
              style={styles.inputCliente}
              editable={false}
              value={textCliente}
              onChangeText={setTextCliente}
            />
          </View>

          {/* OBSERVACIONES */}
          <View style={styles.cliente}>
            <Text>Observaciones:</Text>
            <TextInput
              placeholderTextColor="#888"
              style={styles.inputCliente}
              editable={false}
              value={textObservaciones}
              onChangeText={setTextObservaciones}
            />
          </View>

          {/* CAJAS AGRICOLAS */}
          <View style={styles.inputbaseCajas}>
            <View>
              <Text>Cajas Agrícolas:</Text>
              <View style={styles.inputContainerPedido}>
                <TextInput
                  placeholder=""
                  style={styles.inputPedido}
                  placeholderTextColor="#ccc"
                  value={textCajas}
                  onChangeText={setTextCajas}
                  keyboardType="numeric"
                  editable={false}
                />
                <TouchableOpacity
                  style={styles.touchablePedido}
                  onPress={() => setModalVisible(true)}
                >
                  <Image source={require('../../assets/search.png')} style={styles.iconPedido} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* PARTNER DE CAJAS */}
          <View style={styles.cliente}>
            <TextInput
              placeholderTextColor="#888"
              style={styles.inputCliente}
              value={selectedPartner?.Partner || '' }
              placeholder={selectedPartner?.Partner || '<NO ES PARTNER DE CAJAS AGRICOLAS>'}
              editable={false}
            />
          </View>

          {/* DETALLE DE PEDIDO */}
          {databdDetailRequest.map((pedido) => (
            <View key={pedido.IdPedidoDetalle} style={styles.cards}>
              <View style={styles.productoText}>
                <Text style={styles.textProduct}>{pedido?.Producto}</Text>
              </View>
              <View style={styles.pedidoDetails}>
                <View>
                  <Text style={styles.pedidoDetailsTextTitle}>STATUS:</Text>
                  <Text>{'pedido.Status'}</Text>
                </View>
                <View style={styles.separator} />
                <View>
                  <Text style={styles.pedidoDetailsTextTitle}>CANT:</Text>
                  <Text>{pedido.Cajas}</Text>
                </View>
                <View style={styles.separator} />
                <View>
                  <Text style={styles.pedidoDetailsTextTitle}>PRESENTACION:</Text>
                  <Text>{pedido.Presentacion}</Text>
                </View>
                <View style={styles.separator} />
                <View>
                  <Text style={styles.pedidoDetailsTextTitle}>PALLETS:</Text>
                  <Text>{pedido.Pallets}</Text>
                </View>
                <View style={styles.separator} />
                <View>
                  <Text style={styles.pedidoDetailsTextTitle}>KILOGRAMOS:</Text>
                  <Text>{pedido.Kilogramos}</Text>
                </View>
              </View>
            </View>
          ))}

          <Button title="Guardar" onPress={() => {handleOrderPressInsert();}} />
        </View>
      </View>
    </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalView}>
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell, styles.headerText]}>Partner</Text>
              <Text style={[styles.cell, styles.headerText]}>Clave</Text>
            </View>

            {databdCajas.map((item) => {
              const isSelected = selected === item.IdPartnerIfcoNo;
              return (
                <Pressable
                  key={item.IdPartnerIfcoNo}
                  onPress={() => {handlePress(item.IdPartnerIfcoNo)
                    setcajas(item.IdPartnerIfcoNo)
                  }}
                  style={[styles.row, isSelected && styles.selectedRow]}
                >
                  <Text style={[styles.cell, isSelected && styles.selectedText]}>
                    {item.Partner}
                  </Text>
                  <Text style={[styles.cell, isSelected && styles.selectedText]}>
                    {item.IdPartnerIfcoNo}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable style={styles.btnCerrarCaja} onPress={() => setModalVisible(false)}>
              <Text style={styles.btnText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisiblePedido}
  onRequestClose={() => setModalVisiblePedido(false)}
>
  <View style={styles.overlay}>
    <View style={styles.modalView}>
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.headerText]}>Pedido</Text>
        <Text style={[styles.cell, styles.headerText]}>Control</Text>
        <Text style={[styles.cell, styles.headerText]}>Folio</Text>
      </View>
      <ScrollView style={{ maxHeight: 300 }}>
      {databdOpen.map((item) => {
        const isSelected = selectedOrder === item.IdPedido;
        return (
          <Pressable
            key={item.IdPedido}
            onPress={() => handleOrderPress(item.IdPedido , item.Folio, item.Nombre, item.Observaciones)}
            style={[styles.row, isSelected && styles.selectedRow]}
          >
            <Text style={[styles.cell, isSelected && styles.selectedText]}>
              {item.Nombre}
            </Text>
            <Text style={[styles.cell, isSelected && styles.selectedText]}>
              {item.IdPedido}
            </Text>
            <Text style={[styles.cell, isSelected && styles.selectedText]}>
              {item.Folio}
            </Text>
          </Pressable>
        );
      })}
      </ScrollView>

      <Pressable
        style={styles.btnCerrarCaja}
        onPress={() => {
          const selected = databdOpen.find(i => i.IdPedido === selectedOrder);
          if (selected) {setTextPedido(selected.IdPedido.toString());}
          setModalVisiblePedido(false);
        }}
      >
        <Text style={styles.btnText}>Cerrar</Text>
      </Pressable>
    </View>
  </View>
      </Modal>
   </>
  );
};

const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
  container: {
    width: width * 1,
    height: height * 0.3,
  },
  containerForm:{
  width: width * 1,
  justifyContent:'center',
  alignItems:'center',
  paddingTop: 20,
  paddingBottom: 40,
},
  conainerInputAndLabel: {
    marginTop: height * 0.05,
    marginBottom: height * 0.25,
    backgroundColor: '#fff',
    width: width * 0.96,
    gap: 10,
    borderRadius: 20,
    alignItems: 'center',
    padding: 30,
  },
  containerLabel: {
    backgroundColor: 'white',
    width: width * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    height: 40,
    width: width * 0.4,
    borderRadius: 10,
    backgroundColor: '#ced4da',
  },
  output: {
    marginTop: 10,
    fontSize: 16,
  },
  folioFecha: {
    width: width * 0.9,
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
  inputContainerPedido: {
    height: 40,
    width: width * 0.4,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  touchablePedido: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'grey',
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.057,
    width: width * 0.15,
  },
  iconPedido: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  inputPedido: {
    height: 40,
    width: width * 0.4,
    color: 'black',
    flex: 1,
  },
  inputbasePedido: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputFolioPedido: {
    height: 40,
    width: width * 0.4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cliente: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputCliente: {
    height: 40,
    width: width * 0.8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  inputbaseCajas: {
    width: width * 0.9,
    flexDirection: 'row',
    marginLeft: width * 0.05,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    elevation: 5,
    width: width * 0.8,
    height: height * 0.7,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    fontSize: 16,
  },
  header: {
    backgroundColor: '#eee',
    borderBottomWidth: 2,
    borderBottomColor: '#999',
  },
  headerText: {
    fontWeight: 'bold',
  },
  selectedRow: {
    backgroundColor: '#4caf50',
  },
  selectedText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectionText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  btnCerrarCaja: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  cardsContainer: {
    width: width * 0.95,
    height: height * 0.5,
    borderRadius: 20,
    backgroundColor: '#E5E7F1',
    overflow: 'hidden',
    marginTop: 10,
  },
  cards: {
    backgroundColor: 'white',
    width: width * 0.98,
    height: height * 0.13,
    marginVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  productoText: {
    width: width * 0.88,
  },
  textProduct: {
    color: '#0E5966',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  pedidoDetails: {
    width: width * 0.88,
    height: height * 0.035,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap:1,
  },
  pedidoDetailsTextTitle: {
    color: '#a87a8a',
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
  },
  separator: {
    width: 1.5,
    height: height * 0.05,
    backgroundColor: 'black',
  },
});
export default CreateShipment;
