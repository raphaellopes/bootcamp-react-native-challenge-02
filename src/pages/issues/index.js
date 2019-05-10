import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text, View, FlatList,
} from 'react-native';

import api from '~/services/api';
import Header from '~/components/header';
import Spinner from '~/components/spinner';
import ListItem from '~/components/list-item';

import styles from './styles';

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  state = {
    loading: true,
    data: [],
  }

  componentDidMount() {
    this.loadIssues();
  }

  get title() {
    const { navigation } = this.props;

    return navigation.getParam('repositoryName', '');
  }

  set loading(loading) {
    this.setState({ loading });
  }

  get loading() {
    return this.state.loading;
  }

  handleBack = () => {
    this.props.navigation.navigate('Repositories');
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const fullName = navigation.getParam('repositoryFullName');

    try {
      const { data } = await api.get(`/repos/${fullName}/issues`);
      this.setState({ data });
      this.loading = false;
    } catch (err) {
      console.tron.error(err);
    }
  }

  handlePressItem = (issue) => {
    console.tron.log({ issue });
  }

  // renders
  renderItem = ({ item }) => (
    <ListItem
      id={item.id}
      title={item.title}
      subTitle={item.user.login}
      avatar={item.user.avatar_url}
      onPress={this.handlePressItem}
      avatarRounded
    />
  );

  renderList = () => (
    <FlatList
      data={this.state.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderItem}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>
          Não há issues abertas para esse repositório
        </Text>
      )}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.title} onPressBack={this.handleBack} />
        {this.loading ? <Spinner style={styles.spinner} /> : this.renderList()}
      </View>
    );
  }
}
