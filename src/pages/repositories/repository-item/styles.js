import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  avatar: {
    height: 50,
    width: 50,
  },

  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    flexDirection: 'row',
    marginBottom: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin * 2,
  },

  info: {
    flex: 1,
  },

});

export default styles;
