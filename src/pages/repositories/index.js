import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import Header from '~/components/header';
import Icon from '~/components/icon';
import styles from './styles';

export default class Repositories extends Component {
  state = {
    repositoryinput: '',
  }

  // getters and settters
  set repositoryinput(repositoryinput) {
    this.setState({ repositoryinput });
  }

  get repositoryinput() {
    return this.state.repositoryinput;
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Gitissues" />

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Adicionar novo repositório"
            underlineColorAndroid="transparent"
            value={this.repositoryinput}
            onChangeText={(text) => { this.repositoryinput = text; }}
          />

          <TouchableOpacity onPress={() => {}}>
            <Icon name="plus" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
