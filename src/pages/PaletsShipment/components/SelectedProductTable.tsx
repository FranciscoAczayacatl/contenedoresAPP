import React from 'react';
import { Text, View } from 'react-native';
// import { PalletProps } from '../types/types';
import { styles } from '../styles/styles';

type SelectedProductTableProps = {
  products: any[];
};

const SelectedProductTable: React.FC<SelectedProductTableProps> = ({ products }) => (
  <View style={styles.secondTable}>
    <Text style={styles.title}>Productos Empacados en el Pallet Seleccionado:</Text>
    <View style={styles.row}>
      <Text style={[styles.cell, styles.headerText]}>Producto</Text>
      <Text style={[styles.cell, styles.headerText]}>Cantidad</Text>
      <Text style={[styles.cell, styles.headerText]}>Lote</Text>
      <Text style={[styles.cell, styles.headerText]}>Pallet</Text>
    </View>
    {products.map((product, index) => (
      <View key={index} style={styles.row}>
        <Text style={styles.cell}>{product.Producto}</Text>
        <Text style={styles.cell}>{product.Cajas}</Text>
        <Text style={styles.cell}>{product.IdLote}</Text>
        <Text style={styles.cell}>{product.IdNoPallet}</Text>
      </View>
    ))}
  </View>
);

export default SelectedProductTable;
