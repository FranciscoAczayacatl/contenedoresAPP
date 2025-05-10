import React from 'react';
import { TouchableOpacity, Text, TextInput, View } from 'react-native';
import { PalletProps } from '../types/types';
import { styles } from '../styles/styles';

type TableRowProps = {
  item: PalletProps;
  index: number;
  selectedRowId: number | null;
  onSelectRow: (id: number) => void;
  onEdit: (index: number, value: string) => void;
};

const TableRow: React.FC<TableRowProps> = ({ item, index, selectedRowId, onSelectRow, onEdit }) => {
  const isSelected = selectedRowId === item.Id;

  return (
    <TouchableOpacity
      onPress={() => onSelectRow(item.Id)}
      activeOpacity={1}
      style={[styles.row, isSelected && styles.selectedRow]}
    >
      {(['pallet', 'Cant', 'Kilogramos'] as (keyof PalletProps)[]).map((key) => (
        <View key={key} style={[styles.cell, isSelected && styles.selectedCell]}>
          <Text>{String(item[key])}</Text>
        </View>
      ))}
      <View style={[styles.cell, isSelected && styles.selectedCell]}>
        <TextInput
          style={styles.input}
          value={String(item.Farenheit)}
          onChangeText={(text) => onEdit(index, text)}
          keyboardType="numeric"
          onFocus={() => onSelectRow(item.Id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default TableRow;
