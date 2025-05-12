/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CardsProps } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import { PALLETS } from '@env';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CheckShipment'>;



const CheckShipment = () => {
  const [databd, setDatadb] = useState<CardsProps[]>([]);
  const [filteredData, setFilteredData] = useState<CardsProps[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fechaActual = new Date();
  const mes = fechaActual.getMonth() + 1;
  const anio = fechaActual.getFullYear();

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(PALLETS, {
          params: {
            mes: mes,
            ejercicio: anio,
          },
        });
        setDatadb(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error al cargar datos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mes, anio]);

  const onPressCard = (id: number, facturado:string) => {
    navigation.navigate('ViewShipment', { id, facturado });
  };

  const applySearch = (text: string) => {
    const lowerText = text.toLowerCase();
    const filtered = databd.filter(item =>
      item.IdPallet.toString().includes(lowerText) ||
      item.Nombre.toLowerCase().includes(lowerText)
    );
    setFilteredData(filtered);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    applySearch(text);
  };

  const onSearchButton = () => {
    applySearch(search);
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

  console.log(databd);
  return (
    <LinearGradient colors={['#406450', '#82CAA2']} style={styles.container}>
      <View style={styles.inputbase}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Buscar por embarque o empresa"
            style={styles.input}
            placeholderTextColor="#cccccc"
            value={search}
            onChangeText={handleSearch}
          />
          <TouchableOpacity onPress={onSearchButton}>
            <Image source={require('../../assets/search.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentCardBase}>
        <ScrollView style={styles.cardsContainer}>
          {filteredData.map((embarque: CardsProps) => (
            <TouchableOpacity
              key={embarque.IdPallet}
              style={styles.cards}
              onPress={() => onPressCard(embarque.IdPallet, embarque.facturado)}
            >
              {/* Tarjeta */}
              <View>
                <View style={styles.circleContain}>
                  <View style={styles.circleDesing}>
                    <View style={styles.circle} />
                  </View>
                </View>
                <View style={styles.containImagenCircle}>
                  <View style={styles.circleImagen}>
                    <Image source={require('../../assets/camiones.png')} style={styles.imagen} />
                  </View>
                </View>
              </View>

              <View>
                <View style={styles.textFolioFecha}>
                  <View style={embarque.facturado === 'Si' ? styles.FolioFechaFacturado : styles.FolioFechaNoFacturado} >
                    {
                      embarque.facturado === 'Si' ?
                      <Text style={styles.facturadoText}>Facturado</Text> :
                      <Text style={styles.facturadoText}>No Facturado</Text>
                    }
                  </View>
                  <Text style={styles.textTwoFolioFecha}>
                    {`${embarque.Dia}/${embarque.IdMes}/${embarque.Ejercicio}`}
                  </Text>
                </View>
                <View style={styles.containtextNombreEmpresa}>
                  <Text style={styles.textNombreEmpresa}>{embarque.Nombre}</Text>
                  <Text style={styles.textFolio}>{embarque.TipoPedido}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                <View>
                    <Text style={styles.textt}>EMBARQUE:</Text>
                    <Text style={styles.textt}>{'0000' + embarque.IdPallet}</Text>
                  </View>
                  <View>
                    <Text style={styles.textt}>CONTROL:</Text>
                    <Text style={styles.textt}>{'0000' + embarque.IdPedido}</Text>
                  </View>
                  <View>
                    <Text style={styles.textt}>FOLIO:</Text>
                    <Text style={styles.textt}>{embarque.Folio}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    width:width * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor:'#fff',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: height * 0.06,
    color:'black',
  },
  inputbase:{
    marginTop: height * 0.05,
    width:width * 1,
    alignItems: 'center',
  },
  contentCardBase:{
    width:width * 1,
    height:height * 1,
    marginTop:height * 0.04,
    alignItems: 'center',
  },
  cardsContainer:{
    paddingLeft:height * 0.025,
    paddingBottom:height * 0.5,
    paddingTop:height * 0.015,
    width:width * 0.9,
    height:height * 0.7,
    borderRadius:20,
    backgroundColor:'#E5E7F1',
    overflow: 'hidden',
    marginBottom: height * 0.20,
  },
  cards:{
    marginTop:height * 0.005,
    backgroundColor:'white',
    width: width * 0.80,
    height: height * 0.25,
    borderRadius: 20,
    marginBottom:20,
    flexDirection: 'row',
  },
  circleDesing:{
    width:width * 0.04,
    height: height * 0.020,
    backgroundColor:'#cbcdd6',
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle:{
    width:width * 0.02,
    height: height * 0.01,
    backgroundColor:'white',
    borderRadius:100,
    position:'absolute',
  },
  circleImagen:{
    width:width * 0.25,
    height: height * 0.12,
    backgroundColor:'#444c73',
    borderRadius:100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:height * 0.02,
  },
  imagen:{
    width:50,
    height:50,
  },
  circleContain:{
    padding:5,
    width:width * 0.25,
  },
  containImagenCircle:{
    width: width * 0.32,
    height: height * 0.21,
    alignItems:'center',
  },
  textFolioFecha:{
    flexDirection: 'row',
    marginTop: 1,
    paddingEnd: width * 0.05,
    width:width * 0.48,
    height:height * 0.04,
    justifyContent:'space-evenly',
    alignItems: 'center',
  },
  FolioFechaFacturado:{
    width:width * 0.2,
    height:height * 0.04,
    backgroundColor:'#0081a7',
    alignItems:'center',
    justifyContent:'center',
  },
  FolioFechaNoFacturado:{
    width:width * 0.3,
    height:height * 0.04,
    backgroundColor:'#e63946',
    alignItems:'center',
    justifyContent:'center',
  },
  facturadoText:{
    color:'white',
  },

  textTwoFolioFecha:{
    fontSize:14,
    color:'#f20c0c',
  },
  textFolio:{
    color:'white',
    backgroundColor:'red',
    width:width * 0.48,
    textAlign:'center',
  },
  textNombreEmpresa:{
    textAlign:'center',
    paddingLeft:5,
    paddingRight:5,
    color:'white',
  },
  containtextNombreEmpresa:{
    backgroundColor:'#0E5966',
    width:width * 0.48,
    height: height * 0.12,
    textAlign:'center',
    justifyContent:'center',
    alignItems: 'center',
    marginTop: height * 0.01,
    borderTopStartRadius:20,
    borderBottomStartRadius:20,
  },

  descriptionContainer:{
    width:width * 0.8,
    height: height * 0.025,
    position:'absolute',
    right:0,
    top:130,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems: 'center',

  },
  textt:{
    textAlign:'center',
  },
});

export default CheckShipment;
