import React, { Component } from 'react';
import { View, Text } from 'react-native';

import Header from '~/components/header';

export default class Repositories extends Component {
  state = {
    name: 'Repositories',
  }

  render() {
    return (
      <View>
        <Header title="Gitissues" />
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}
