import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';

import { colors } from '~/styles';

const Spinner = ({ color, ...props }) => (
  <ActivityIndicator color={colors[color]} {...props} />
);

Spinner.propTypes = {
  color: PropTypes.string,
};

Spinner.defaultProps = {
  color: 'dark',
};

export default Spinner;
