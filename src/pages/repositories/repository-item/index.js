import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, Image, TouchableOpacity,
} from 'react-native';

import Icon from '~/components/icon';
import styles from './styles';

const RepositoryItem = ({ repository, onPress }) => (
  <TouchableOpacity
    style={styles.container}
    onPress={() => onPress(repository)}
  >
    <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
    <View style={styles.info}>
      <Text style={styles.name}>{repository.name}</Text>
      <Text style={styles.organization}>{repository.organization}</Text>
    </View>
    <Icon name="chevron-right" color="light" size={10} />
  </TouchableOpacity>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    organization: PropTypes.string,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default RepositoryItem;
