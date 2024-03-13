import { StyleSheet, View } from 'react-native';

import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        <AppBar />
        <RepositoryList />
      </View>
    </>
  );
};

export default Main;

