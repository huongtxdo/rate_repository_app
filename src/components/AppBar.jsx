import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-start',
    backgroundColor: theme.backgroundColors.appBar,
    padding: 20,
    // width: '100%',
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} path={'/'} />
        <AppBarTab text={'Sign in'} path={'/signin'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;

