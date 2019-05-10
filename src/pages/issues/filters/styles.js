import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  active: {
    color: colors.dark,
    fontWeight: 'bold',
  },

  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: metrics.baseRadius,
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: metrics.baseMargin * 2,
  },

  item: {
    paddingVertical: metrics.basePadding / 4,
  },

  itemText: {
    color: colors.regular,
  },
});

export default styles;
