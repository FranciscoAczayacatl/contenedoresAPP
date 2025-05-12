import React from 'react';
import { Dimensions, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

const options = [
  { id: 1, title: 'REVISAR EMBARQUE', img: 'embarque1' },
  { id: 2, title: 'CREAR EMBARQUE', img: 'embarque2' },
];

const images: { [key: string]: ImageSourcePropType } = {
  embarque1: require('../../assets/embarque1.jpg'),
  embarque2: require('../../assets/embarque2.png'),
};

const Home = () => {

  const navigation = useNavigation<NavigationProp>();
  const onPressOption = (item:number) => {
    if(item === 1 ){
      navigation.navigate('CheckShipment');
    }else{
      navigation.navigate('CreateShipment');
    }
  };



  return (
  <>
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      colors={['#406450', '#82CAA2']}
      style={styles.container}
    />
    <View style={styles.triangle}/>
    <View style={styles.retangule}/>
    <View style={styles.title} >
      <Text style={styles.text}>CONTENEDORES</Text>
    </View>
    <View  style={styles.content}>
      {
        options.map((item)=>(
          <TouchableOpacity onPress={()=>onPressOption(item.id)} key={item.id}>
          <View style={styles.options} >
              <Image source={images[item.img]} style={styles.image} />
              <View style={styles.titleOptions}>
                <Text style={styles.titleOptions}>{item.title}</Text>
              </View>
          </View>
          </TouchableOpacity>
        ))
      }
    </View>
  </>

  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  triangle: {
    width: 0,
    height: 0,
    borderLeftWidth: width * 1.2,
    borderRightWidth: 0,
    borderBottomWidth: width * 1,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#E5E7F1',
    position: 'absolute',
    bottom: width * 0.75,
    left: -15,
  },
  retangule:{
    backgroundColor:'#E5E7F1',
    width:width * 1,
    height:height * 0.42,
  },
  title:{
    backgroundColor: 'white',
    width: width * 0.8,
    height: height * 0.11,
    padding: 20,
    position: 'absolute',
    top: height * 0.1,
    zIndex: 2,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text:{
    fontSize:30,
    fontWeight:'400',
    color:'#406450',
  },
  view:{
    width: width * 1,
    position: 'absolute',
    top: height * 0.3,
    left: width * 0.2,
    zIndex: 2,
    backgroundColor: 'white',
  },
  image:{
      height:height * 0.2,
      width:width * 0.35,
      resizeMode: 'cover',
      borderTopLeftRadius:20,
      borderBottomLeftRadius:20,
  },
  content:{
    width:width * 1,
    height:height * 1,
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    gap:20,
  },
  options:{
    flexDirection: 'row',
    width:width * 0.75,
    height:height * 0.2,
    backgroundColor:'white',
    borderRadius:20,
  },
  titleOptions:{
    display:'flex',
    width:width * 0.40,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign:'center',
    color:'#406450',
    fontWeight:'500',
  },

});

export default Home;
