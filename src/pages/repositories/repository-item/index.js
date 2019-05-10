import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';

import Icon from '~/components/icon';
import styles from './styles';

const RepositoryItem = ({ repository }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: repository.avatar_url }} />
    <View style={styles.info}>
      <Text style={styles.name}>{repository.name}</Text>
      <Text style={styles.organization}>{repository.organization}</Text>
    </View>
    <Icon name="chevron-right" color="light" />
  </View>
);

RepositoryItem.propTypes = {
  repository: PropTypes.shape({
    name: PropTypes.string,
    avatar_url: PropTypes.string,
    organization: PropTypes.string,
  }).isRequired,
};

export default RepositoryItem;
