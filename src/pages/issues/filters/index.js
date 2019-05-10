import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const Filters = ({ items, onItemPress }) => (
  <View style={styles.container}>
    {items.map(item => (
      <TouchableOpacity
        key={item.id}
        style={styles.item}
        onPress={() => !item.active && onItemPress(item)}
      >
        <Text style={[styles.itemText, item.active && styles.active]}>
          {item.label}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

Filters.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    value: PropTypes.string,
    active: PropTypes.bool,
  })).isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default Filters;
