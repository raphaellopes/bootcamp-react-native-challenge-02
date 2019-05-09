import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors, metrics, fonts } from '~/styles';

const statusBarHeight = getStatusBarHeight(true);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderBottomColor: colors.light,
    borderBottomWidth: metrics.baseBorder,
    flexDirection: 'row',
    height: 54 + statusBarHeight,
    justifyContent: 'space-between',
    paddingHorizontal: metrics.basePadding,
    paddingTop: statusBarHeight,
  },

  title: {
    color: colors.darker,
    fontSize: fonts.large,
    fontWeight: 'bold',
  },
});

export default styles;
