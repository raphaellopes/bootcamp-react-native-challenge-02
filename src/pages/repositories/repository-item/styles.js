import { StyleSheet } from 'react-native';
import { colors, metrics, fonts } from '~/styles';

const styles = StyleSheet.create({
  avatar: {
    height: 25,
    width: 25,
  },

  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    flexDirection: 'row',
    marginBottom: metrics.baseMargin,
    marginHorizontal: metrics.baseMargin * 2,
    paddingHorizontal: metrics.basePadding,
    paddingVertical: metrics.basePadding / 2,
  },

  info: {
    flex: 1,
    marginHorizontal: metrics.baseMargin,
  },

  name: {
    color: colors.darker,
    fontSize: fonts.base,
    fontWeight: 'bold',
  },

  organization: {
    color: colors.light,
    fontSize: fonts.small,
  },
});

export default styles;
