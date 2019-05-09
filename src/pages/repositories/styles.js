import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },

  form: {
    alignItems: 'center',
    borderBottomWidth: metrics.baseBorder,
    borderColor: colors.light,
    flexDirection: 'row',
    margin: metrics.baseMargin * 2,
    paddingBottom: metrics.basePadding,
  },

  input: {
    backgroundColor: colors.white,
    borderColor: colors.light,
    borderRadius: metrics.baseRadius,
    borderWidth: metrics.baseBorder,
    flex: 1,
    height: 40,
    marginRight: metrics.baseMargin * 2,
    paddingHorizontal: metrics.basePadding,
  },

});

export default styles;
