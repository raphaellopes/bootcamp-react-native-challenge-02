import React, { Component } from 'react';
import {
  Linking,
  Text, View, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';


import api from '~/services/api';
import Header from '~/components/header';
import Spinner from '~/components/spinner';
import ListItem from '~/components/list-item';

import Filters from './filters';
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
    filters: [
      {
        id: 1, label: 'Todas', value: 'all', active: true,
      },
      {
        id: 2, label: 'Abertas', value: 'open', active: false,
      },
      {
        id: 3, label: 'Fechadas', value: 'closed', active: false,
      },
    ],
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

  get filters() {
    return this.state.filters;
  }

  set filter(filter) {
    const filters = this.filters.map((item) => {
      if (item.id === filter.id) {
        item.active = true;
      } else {
        item.active = false;
      }

      return item;
    });

    this.setState({ filters });
  }

  get data() {
    const filter = this.filters.find(item => item.active);
    if (filter.value === 'all') {
      return this.state.data;
    }
    return this.state.data.filter(item => item.state === filter.value);
  }

  handleBack = () => {
    this.props.navigation.navigate('Repositories');
  }

  loadIssues = async () => {
    const { navigation } = this.props;
    const fullName = navigation.getParam('repositoryFullName');

    try {
      const { data } = await api.get(`/repos/${fullName}/issues?state=all`);
      this.setState({ data });
      this.loading = false;
    } catch (err) {
      console.tron.error(err);
    }
  }

  handlePressItem = (id) => {
    const issue = this.data.find(item => item.id === id);

    Linking
      .openURL(issue.html_url)
      .catch(err => console.tron.error(err));
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
      data={this.data}
      keyExtractor={item => String(item.id)}
      renderItem={this.renderItem}
      ListEmptyComponent={() => (
        <Text style={styles.empty}>
          Não há issues abertas para esse repositório
        </Text>
      )}
    />
  )

  renderFilters = () => !this.loading && (
    <Filters
      items={this.filters}
      onItemPress={(item) => { this.filter = item; }}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.title} onPressBack={this.handleBack} />
        {this.renderFilters()}
        {this.loading ? <Spinner style={styles.spinner} /> : this.renderList()}
      </View>
    );
  }
}
