import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import Icon from '~/components/icon';
import styles from './styles';

const ListItem = ({
  id, avatar, title, subTitle, onPress, avatarRounded,
}) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress(id)}
  >
    <Image
      style={[styles.avatar, avatarRounded && styles.avatarRounded]}
      source={{ uri: avatar }}
    />
    <View style={styles.info}>
      <Text style={styles.title} numberOfLines={1}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
    <Icon name="chevron-right" color="light" size={10} />
  </TouchableOpacity>
);

ListItem.propTypes = {
  id: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  avatarRounded: PropTypes.bool,
};

ListItem.defaultProps = {
  avatarRounded: false,
};

export default ListItem;
