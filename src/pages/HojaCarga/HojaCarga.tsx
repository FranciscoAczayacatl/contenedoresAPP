/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../App';

type ViewShipmentRouteProp = RouteProp<RootStackParamList, 'HojaCarga'>;
const HojaCarga: React.FC = () => {
  const route = useRoute<ViewShipmentRouteProp>();
  const { id } = route.params as { id: number , facturado:string };
  const [dispatchDate, setDispatchDate] = useState(new Date());

  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [dispatchTime, setDispatchTime] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [cajaLimpia, setCajaLimpia] = useState('');
  const [cajaSanitizada, setCajaSanitizada] = useState('');
   const [equipoFuncionando, setEquipoFuncionando] = useState('');
  console.log('====================================');
  console.log(id);
  console.log('====================================');
const handleValueChange = (itemValue: string) => {
  setSelectedValue(itemValue);

  // Buscar el objeto completo del empleado
  const selectedObj = data.find((item) => item.Id_Empleado === itemValue);
  setSelectedEmployee(selectedObj);
};

  const [selectedValue2, setSelectedValue2] = useState('');
const [selectedEmployee2, setSelectedEmployee2] = useState(null);
const handleValueChange2 = (itemValue: string) => {
  setSelectedValue2(itemValue);

  // Buscar el objeto completo del empleado
  const selectedObj = data.find((item) => item.Id_Empleado === itemValue);
  setSelectedEmployee2(selectedObj);
};

  const [showDispatchDatePicker, setShowDispatchDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDispatchTimePicker, setShowDispatchTimePicker] = useState(false);
  const [data, setData] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://172.16.1.100:3000/pod/libero-embarque');

        setData(response.data);

      } catch (error) {
        console.error('Error al cargar datos', error);
      } finally {

      }
    };

    fetchData();
  }, []);

  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`;

  const formatTime = (d: Date) =>
    `${d.getHours().toString().padStart(2, '0')}:${d
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;


      
  const enviar = async() =>{
    const datos = {
      Id_Embarque: id,
      Id_Realizo_embarque:	selectedEmployee?.Id_Empleado,
      Id_Autorizo_embarque:	selectedEmployee2.Id_Empleado,
      Fecha:	dispatchDate.toString(),
      Hora_Inicio:	startTime.toString(),
      Hora_Fin:	endTime.toString(),
	    Hora_Despacho:	dispatchTime.toString(),
      Caja_Limpia:	cajaLimpia,
      Caja_Sanitizada:	cajaSanitizada,
      Equipo_Funcionamiento: equipoFuncionando,
      Usuario: 'Admin',
    };
    const resut = await axios.post('http://172.16.1.100:3000/pod/embarque', datos);
    console.log('====================================');
    console.log(resut);
    console.log('====================================');
  };
  return (
    <LinearGradient colors={['#406450', '#82CAA2']} style={styles.container}>
      <View style={styles.dahc}>
       <View style={styles.hdhi}>
         {/* Fecha de despacho */}
        <TouchableOpacity
          onPress={() => setShowDispatchDatePicker(true)}
          style={styles.button}
        >
          <Text style={styles.label}>Fecha de despacho:</Text>
          <View style={styles.row}>
            <Text style={styles.input}>{formatDate(dispatchDate)}</Text>
          </View>
        </TouchableOpacity>

        {/* Hora inicio */}
        <TouchableOpacity
          onPress={() => setShowStartTimePicker(true)}
          style={styles.button}
        >
          <Text style={styles.label}>Hora inicio:</Text>
          <View style={styles.row}>
            <Text style={styles.input}>{formatTime(startTime)}</Text>
          </View>
        </TouchableOpacity>
       </View>

      <View style={styles.hdhi}>
        {/* Hora final */}
        <TouchableOpacity
          onPress={() => setShowEndTimePicker(true)}
          style={styles.button}
        >
          <Text style={styles.label}>Hora final:</Text>
          <View style={styles.row}>
            <Text style={styles.input}>{formatTime(endTime)}</Text>
          </View>
        </TouchableOpacity>

        {/* Hora despacho */}
        <TouchableOpacity
          onPress={() => setShowDispatchTimePicker(true)}
          style={styles.button}
        >
          <Text style={styles.label}>Hora despacho:</Text>
          <View style={styles.row}>
            <Text style={styles.input}>{formatTime(dispatchTime)}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.pickerText}>
        <Text style={styles.label}>Liberacion:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un empleado" value=""  />
          {data?.map((item) => (
            <Picker.Item
              key={item.Id_Empleado}
              label={item.Nombre_Empleado}
              value={item.Id_Empleado}
            />
          ))}
        </Picker>
        <View>
            <Text style={styles.label}>puesto:</Text>
        <TextInput style={styles.input2}
            value={selectedEmployee?.Puesto_Empleado || ''}
            editable={false}/>
        </View>
              </View>


        <View style={styles.pickerText}>
        <Text style={styles.label}>Liberacion:</Text>
        <Picker
          selectedValue={selectedValue2}
          onValueChange={handleValueChange2}
          style={styles.picker}
        >
          <Picker.Item label="Selecciona un empleado" value=""  />
          {data?.map((item) => (
            <Picker.Item
              key={item.Id_Empleado}
              label={item.Nombre_Empleado}
              value={item.Id_Empleado}
            />
          ))}
        </Picker>
              </View>

        {/* Pickers */}
        {showDispatchDatePicker && (
          <DateTimePicker
            value={dispatchDate}
            mode="date"
            display={Platform.OS === 'android' ? 'calendar' : 'default'}
            onChange={(_, selected) => {
              setShowDispatchDatePicker(false);
              if (selected) setDispatchDate(selected);
            }}
          />
        )}
        {showStartTimePicker && (
          <DateTimePicker
            value={startTime}
            mode="time"
            is24Hour
            display={Platform.OS === 'android' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowStartTimePicker(false);
              if (selected) setStartTime(selected);
            }}
          />
        )}
        {showEndTimePicker && (
          <DateTimePicker
            value={endTime}
            mode="time"
            is24Hour
            display={Platform.OS === 'android' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowEndTimePicker(false);
              if (selected) setEndTime(selected);
            }}
          />
        )}
        {showDispatchTimePicker && (
          <DateTimePicker
            value={dispatchTime}
            mode="time"
            is24Hour
            display={Platform.OS === 'android' ? 'spinner' : 'default'}
            onChange={(_, selected) => {
              setShowDispatchTimePicker(false);
              if (selected) setDispatchTime(selected);
            }}
          />
        )}

        <StatusBar />
      </View>

      <View style={styles.dt} >
        <View style={styles.dt1}>
  <View style={styles.pickerContainer}>
    <Text style={styles.label}>Caja Limpia:</Text>
    <Picker
      selectedValue={cajaLimpia}
      onValueChange={(itemValue) => setCajaLimpia(itemValue)}
      style={styles.picker2}
    >
      <Picker.Item label="" value="" />
      <Picker.Item label="OPTIMO" value="OPTIMO" />
      <Picker.Item label="DEFICIENTE" value="DEFICIENTE" />
    </Picker>
  </View>

  <View style={styles.pickerContainer}>
    <Text style={styles.label}>Caja Sanitizada:</Text>
    <Picker
      selectedValue={cajaSanitizada}
      onValueChange={(itemValue) => setCajaSanitizada(itemValue)}
      style={styles.picker2}
    >
      <Picker.Item label="" value="" />
      <Picker.Item label="OPTIMO" value="OPTIMO" />
      <Picker.Item label="DEFICIENTE" value="DEFICIENTE" />
    </Picker>
  </View>
</View>

      <View style={styles.ef}>
        <Text style={styles.label}>Equipo Funcionando:</Text>
         <Picker
        selectedValue={equipoFuncionando}
        onValueChange={(itemValue) => setEquipoFuncionando(itemValue)}
        style={styles.picker3}
      >
        <Picker.Item label="" value="" />
        <Picker.Item label="OPTIMO" value="OPTIMO" />
        <Picker.Item label="DEFICIENTE" value="DEFICIENTE" />
      </Picker>
      </View>
      </View>

      <Button
        title="Enviar"
        onPress={() => enviar()
        }
      />
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 15,
  },
  dahc: {
    width: width * 0.9,
     height: height * 0.53,
    backgroundColor: '#adb5bd',
    borderRadius: 5,

  },
  dt: {
    width: width * 0.9,
    height: height * 0.3,
    backgroundColor: '#adb5bd',
    borderRadius: 5,
  },
  label: {
    fontWeight: 'bold',
    width:width * 0.8,

  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 6,
    fontSize: 16,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input2:{
    textAlign:'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    width: width * 0.4,
  },
  button: {
    width: width * 0.35,
    padding: 10,
  },
  hdhi:{
    flexDirection: 'row',
    width: width * 0.9,
    justifyContent:'space-around',
  },
  picker: { height: 50, backgroundColor:'white', width:width * 0.8},
  pickerText:{
    alignItems:'center',
  },

  dt1: {

  width: width * 0.9,
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 10,
},

picker2: {
  backgroundColor: 'white',
  width: '100%',
},

pickerContainer: {
  width: '48%', // O usa flex: 1 y añade margen si lo prefieres
},
picker3:{
  height: 50, backgroundColor:'white', width:width * 0.5
},
ef:{
  width: width * 0.9,
  alignItems:'center',
  justifyContent:'center',
  textAlign:'center',
  
},
});

export default HojaCarga;
