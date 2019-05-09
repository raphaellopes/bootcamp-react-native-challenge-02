import React from 'react';
import PropTypes from 'prop-types';
import VectorIcon from 'react-native-vector-icons/FontAwesome';

import { colors } from '~/styles';

const Icon = ({
  name, size, color, ...props
}) => (
  <VectorIcon
    name={name}
    color={colors[color]}
    size={size}
    {...props}
  />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.number,
};

Icon.defaultProps = {
  color: 'darker',
  size: 20,
};

export default Icon;
