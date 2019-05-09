import React, { Component } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';

import api from '~/services/api';
import Header from '~/components/header';
import Icon from '~/components/icon';
import Spinner from '~/components/spinner';
import styles from './styles';

export default class Repositories extends Component {
  state = {
    repositoryinput: '',
    loading: false,
    data: [],
  }

  // getters and settters
  set repositoryinput(repositoryinput) {
    this.setState({ repositoryinput });
  }

  get repositoryinput() {
    return this.state.repositoryinput;
  }

  set loading(loading) {
    this.setState({ loading });
  }

  get loading() {
    return this.state.loading;
  }

  set addItem(item) {
    const { state } = this;
    const { data } = state;

    this.setState({
      ...state,
      data: {
        ...data,
        item,
      },
    });
  }

  addRepository = async () => {
    this.loading = true;

    try {
      const { data } = await api.get(`/repos/${this.repositoryinput}`);
      this.addItem = {
        id: data.id,
        name: data.name,
        avatar_url: data.organization.avatar_url,
        organization: data.organization.login,
      };
      this.loading = false;
    } catch (err) {
      console.tron.error(err);
    }
  }

  // renders
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

          <TouchableOpacity onPress={this.addRepository}>
            {this.loading ? <Spinner /> : <Icon name="plus" />}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
