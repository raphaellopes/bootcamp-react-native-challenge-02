import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Repositories extends Component {
  state = {
    name: 'Repositories',
  }

  render() {
    return (
      <View>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}
