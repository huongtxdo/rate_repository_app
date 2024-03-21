import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-start',
    backgroundColor: theme.backgroundColors.appBar,
    // paddingBottom: Constants.statusBarHeight,
    padding: 20,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={'Repositories'} path={'/'} />
      <AppBarTab text={'Sign in'} path={'/signin'} />
    </View>
  );
};

export default AppBar;

