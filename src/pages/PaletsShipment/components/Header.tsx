import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { PalletProps } from '../types/types';
import { styles } from '../styles/styles';

type HeaderProps = {
  sortBy: string;
  onSort: (key: keyof PalletProps) => void;
};

const Header: React.FC<HeaderProps> = ({ sortBy, onSort }) => (
  <View style={styles.row}>
    {['pallet', 'Cant', 'Kilogramos', 'F°'].map((col) => (
      <TouchableOpacity key={col} onPress={() => onSort(col as keyof PalletProps)} style={styles.cell}>
        <Text style={styles.headerText}>
          {col}
          {sortBy === col ? '' : ''}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default Header;
