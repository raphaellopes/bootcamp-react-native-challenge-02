import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  Text, View, TextInput, TouchableOpacity, FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import api from '~/services/api';
import Header from '~/components/header';
import Icon from '~/components/icon';
import Spinner from '~/components/spinner';
import ListItem from '~/components/list-item';

import styles from './styles';

// AsyncStorage.clear();

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

export default class Repositories extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    repositoryinput: '',
    loading: false,
    refreshing: false,
    data: [],
  }

  componentDidMount() {
    this.loadRepositories();
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

  set refreshing(refreshing) {
    this.setState({ refreshing });
  }

  get refreshing() {
    return this.state.refreshing;
  }

  set addItem(item) {
    const { state } = this;
    const { data } = state;

    this.setState({
      ...state,
      data: [
        ...data,
        item,
      ],
    });
  }

  get data() {
    return this.state.data;
  }

  loadRepositories = async () => {
    const repositories = await AsyncStorage.getItem('@Gitissues:repositories');

    if (repositories) {
      this.setState({ data: JSON.parse(repositories) });
    }
  }

  saveRepositories = async () => {
    await AsyncStorage.setItem(
      '@Gitissues:repositories',
      JSON.stringify(this.data),
    );
  }

  getRepoDataFromApi = async (repo) => {
    const { data } = await api.get(`/repos/${repo}`);
    this.addItem = {
      id: data.id,
      name: data.name,
      fullName: data.full_name,
      avatar: data.organization.avatar_url,
      organization: data.organization.login,
    };
    await this.saveRepositories();
    return data;
  }

  addRepository = async () => {
    this.loading = true;

    try {
      await this.getRepoDataFromApi(this.repositoryinput);
      this.loading = false;
      this.repositoryinput = '';
    } catch (err) {
      console.tron.error(err);
      this.loading = false;
      this.repositoryinput = '';
    }
  }

  handleUpdate = async () => {
    this.refreshing = true;
    this.setState({ data: [] });
    let repositories = await AsyncStorage.getItem('@Gitissues:repositories');

    if (repositories) {
      repositories = JSON.parse(repositories).map(repo => repo.fullName);
      console.tron.log(repositories);

      await asyncForEach(repositories, async (repo) => {
        await this.getRepoDataFromApi(repo);
      });
    }

    this.refreshing = false;
  }

  handlePressItem = (id) => {
    const { id: repoId, name, fullName } = this.data.find(item => item.id === id);
    this.props.navigation.navigate('Issues', {
      repositoryId: repoId,
      repositoryName: name,
      repositoryFullName: fullName,
    });
  }

  // renders
  renderItem = ({ item }) => (
    <ListItem
      id={item.id}
      title={item.name}
      subTitle={item.organization}
      avatar={item.avatar}
      onPress={this.handlePressItem}
    />
  );

  renderList = () => (
    <FlatList
      data={this.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderItem}
      refreshing={this.refreshing}
      onRefresh={this.handleUpdate}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>
          {this.refreshing
            ? ''
            : 'Você ainda não adicionou nenhum repositório'
          }
        </Text>
      )}
    />
  );

  renderForm() {
    return (
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
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title="Gitissues" />

        {this.renderForm()}
        {this.renderList()}
      </View>
    );
  }
}
