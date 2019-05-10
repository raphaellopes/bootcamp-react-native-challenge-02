import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import Header from '~/components/header';

import styles from './styles';

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  get title() {
    const { navigation } = this.props;

    return navigation.getParam('repositoryName', '');
  }

  handleBack = () => {
    this.props.navigation.navigate('Repositories');
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.title} onPressBack={this.handleBack} />

      </View>
    );
  }
}
