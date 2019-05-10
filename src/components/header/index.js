import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';

import Icon from '~/components/icon';
import styles from './styles';

const Header = ({ title, onPressBack }) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.left}
      onPress={onPressBack}
    >
      {onPressBack && <Icon name="chevron-left" />}
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.right} />
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  onPressBack: PropTypes.func,
};

Header.defaultProps = {
  onPressBack: null,
};

export default Header;
