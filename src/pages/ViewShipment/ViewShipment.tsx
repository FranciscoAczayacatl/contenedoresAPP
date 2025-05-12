/* eslint-disable react-native/no-inline-styles */
import { NavigationProp, RouteProp, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../../../App';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import { detailRequest, OrderProps } from './types';
import { useRoute } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

type ViewShipmentRouteProp = RouteProp<RootStackParamList, 'ViewShipment'>;

type Props = {
  route: ViewShipmentRouteProp;
};


const ViewShipment: React.FC<Props> = () => {
  const route = useRoute();
  const { id, facturado } = route.params as { id: number, facturado:string };
  const [loading, setLoading] = useState(true);
  const [loadingtwo, setLoadingtwo] = useState(true);
  const [databd, setDatadb] = useState<OrderProps | null>(null);
  const [databdDetailRequest, setDatadbDetailRequest] = useState<detailRequest []>([]);
  console.log(facturado);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://192.168.1.88:3000/pallets/${id}`);
        setDatadb(response.data);
      } catch (error) {
        console.error('Error al cargar datos', error);
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchDataPedidoDetalle = async () => {
      if (!databd?.IdPedido) {return;}
      try {
        const response = await axios.get('http://192.168.1.88:3000/pedido-detalle', {
          params: {
            idPedido: databd.IdPedido,
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

    fetchDataPedidoDetalle();
  }, [databd]);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressCard = () => {
      navigation.navigate('PaletsShipment', {id, facturado});

    };

    if (loading && loadingtwo) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <LottieView
              source={require('../../assets/animations/Animation.json')}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
          </View>
        );
      }

console.log(databdDetailRequest);
  return (
    <LinearGradient
      colors={['#406450', '#82CAA2']}
      style={styles.container}
    >
      <View style={styles.containerDesciption}>
        <View style={styles.containName}>
          <Text style={styles.textName}>{databd?.Nombre}</Text>
        </View>


        <View style={styles.containerEmbarqueFecha}>
          <View style={styles.containerC}>
            <Text>Folio: </Text>
            <Text>{`0000${databd?.IdPallet}`}</Text>
          </View>
          <View style={styles.containerC}>
            <Text>Fecha: </Text>
            <Text>{`${databd?.Dia}/${databd?.IdMes}/${databd?.Ejercicio}`}</Text>
          </View>
        </View>
        <View style={styles.containerEmbarqueFecha}>
          <View style={styles.containerC}>
            <Text>Pedido No: </Text>
            <Text>{`0000${databd?.IdPedido}`}</Text>
          </View>
          <View style={styles.containerC}>
            <Text>Folio:  </Text>
            <Text>{databd?.Folio}</Text>
          </View>
        </View>

        <View style={styles.containerEmbarqueFecha}>
          <View style={styles.containerC}>
            <Text><Text>{databd?.TipoPedido}</Text> </Text>
          </View>
        </View>
        <View style={styles.containerEmbarqueFecha}>
          <View style={styles.containerCc}>
            <Text>P. cajas agricolas:</Text>
            <Text>{}</Text>
          </View>
          <View style={styles.containerCcC}>
            <Text>{}</Text>
          </View>
        </View>
        <View style={styles.containerEmbarqueFecha}>
          <View style={styles.containerCcP}>
            <Text>{databd?.Partner}</Text>
          </View>
        </View>
        <View style={styles.containerEmbarqueFecha}>
          <View style={styles.containerCcO}>
            <Text>Observaciones:</Text>
            <Text>{}</Text>
          </View>
          <View style={styles.containerCcCO}>
            <Text>{}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}>
          {
            databdDetailRequest.map((pedido: detailRequest ) => (
              <View key={pedido.IdPedidoDetalle} style={styles.cards}>
                <View style={styles.productoText}>
                  <Text style={styles.textProduct}>{pedido?.Producto}</Text>
                </View>
                <View style={styles.pedidoDetails}>
                  <View >
                    <Text style={styles.pedidoDetailsTextTitle}>STATUS:</Text>
                    <Text>{'pedido.Status'}</Text>
                  </View>
                  <View style={styles.separator}/>
                  <View >
                    <Text style={styles.pedidoDetailsTextTitle}>CANT:</Text>
                    <Text>{pedido.Cajas}</Text>
                  </View>
                  <View style={styles.separator}/>
                  <View >
                    <Text style={styles.pedidoDetailsTextTitle}>PRESENTACION:</Text>
                    <Text>{pedido.Presentacion}</Text>
                  </View>
                  <View style={styles.separator}/>
                  <View>
                    <Text style={styles.pedidoDetailsTextTitle}>PALLETS:</Text>
                    <Text>{pedido.Pallets}</Text>
                  </View>
                  <View style={styles.separator}/>
                  <View >
                    <Text style={styles.pedidoDetailsTextTitle}>KILOGRAMOS:</Text>
                    <Text>{pedido.Kilogramos}</Text>
                  </View>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.btn} onPress={()=>onPressCard()}>
        <Text style={styles.btnText}>PALLETS</Text>
      </TouchableOpacity>
    </LinearGradient>
    );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerDesciption:{
    backgroundColor:'#E5E7F1',
    marginTop: height * 0.005,
    height:height * 0.35,
    width: width * 0.9,
    borderRadius:20,
    alignItems: 'center',
  },
  containName:{
    backgroundColor:'white',
    width:width * 0.85,
    height: height * 0.060,
    alignItems: 'center',
    borderRadius:20,
    justifyContent: 'center',
    marginTop:5,
    padding:5,
  },
  textName:{
    textAlign:'center',
    fontSize:18,
    fontWeight:600,
    color:'#0E5966',
  },
  containerEmbarqueFecha:{
    flexDirection:'row',
    width:width * 0.90,
    height: height * 0.045,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  containerC:{
    backgroundColor:'white',
    flexDirection:'row',
    width: width * 0.4,
    height: height * 0.035,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  containerCc:{
    backgroundColor:'white',
    flexDirection:'row',
    width: width * 0.5,
    height: height * 0.035,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  containerCcC:{
    backgroundColor:'white',
    flexDirection:'row',
    width: width * 0.3,
    height: height * 0.035,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  containerCcP:{
    backgroundColor:'white',
    flexDirection:'row',
    width: width * 0.8,
    height: height * 0.035,
    justifyContent:'space-around',
    alignItems:'center',
    borderRadius:20,
  },

  containerPedidos:{
    backgroundColor:'#E5E7F1',
    marginTop: height * 0.03,
    height:height * 0.52,
    width: width * 0.95,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',

  },

  contentCardBase: {
    width: width * 0.5,
    height: height * 1,
    marginTop: height * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardsContainer: {
    width: width * 0.95,
    height: height * 0.50,
    borderRadius: 20,
    backgroundColor: '#E5E7F1',
    overflow: 'hidden',
    marginTop:10,
  },

  cards: {
    backgroundColor: 'white',
    width: width * 0.93,
    height: height * 0.14,
    marginVertical: 5,
    borderRadius: 20,
    alignItems:'center',
    justifyContent:'center',
    gap:2,
  },
  productoText:{
    width: width * 0.88,
  },
  textProduct:{
    color:'#0E5966',
    fontSize:16,
    fontWeight:600,
    textAlign:'center',
  },
  pedidoDetails:{
    width: width * 0.88,
    height: height * 0.035,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  pedidoDetailsTextTitle:{
    color:'#a87a8a',
    fontSize:11,
    fontWeight:400,
    textAlign:'center',
  },
  separator:{
    width: 1.5,
    height:height * 0.05,
    backgroundColor:'black',
  },
  btn:{
    marginTop:15,
    backgroundColor:'#30638e',
    width: width * 0.5,
    height:height * 0.05,
    borderRadius:20,
    justifyContent:'center',
    alignContent:'center',
  },
  btnText:{
    textAlign:'center',
    color:'white',
  },
  containerCcO:{
    backgroundColor:'white',
    flexDirection:'row',
    width: width * 0.3,
    height: height * 0.035,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
  containerCcCO:{
    backgroundColor:'white',
    flexDirection:'row',
    width: width * 0.55,
    height: height * 0.035,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:20,
  },
});

export default ViewShipment;
