import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-start',
    backgroundColor: theme.backgroundColors.appBar,
    paddingBottom: Constants.statusBarHeight,
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={'Repositories'} keyPressed={() => console.log('hey')} />
    </View>
  );
};

export default AppBar;

