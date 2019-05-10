import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lighter,
    flex: 1,
  },

  spinner: {
    marginTop: metrics.baseMargin * 2,
  },
});

export default styles;
