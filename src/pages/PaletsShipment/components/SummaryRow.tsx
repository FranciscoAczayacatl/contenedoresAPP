/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/styles';

type SummaryRowProps = {
  pallets: number;
  cajas: number;
  kilogramos: number;
  onIconPress?: () => void;
};

const SummaryRow: React.FC<SummaryRowProps> = ({ pallets, cajas, kilogramos, onIconPress }) => (
  <View style={styles.summaryRow}>
    <View style={styles.summaryCell}>
      <Text style={styles.summaryText}>Pallets: {pallets}</Text>
    </View>
    <View style={styles.summaryCell}>
      <Text style={styles.summaryText}>Cant: {cajas}</Text>
    </View>
    <View style={styles.summaryCell}>
      <Text style={styles.summaryText}>Kg: {kilogramos}</Text>
    </View>
    <TouchableOpacity onPress={onIconPress} style={styles.button}>
      <Image
        source={require('../../../assets/mop.png')}
        style={{ width: 15, height: 15 }}
      />
    </TouchableOpacity>
  </View>
);



export default SummaryRow;
