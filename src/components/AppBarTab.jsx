import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  appBarTab: {
    padding: 10,
  },
  // ...
});

const AppBarTab = (props) => {
  const { text, path } = props;
  return (
    <Pressable style={styles.appBarTab}>
      <Link to={path}>
        <Text fontWeight={'bold'} color={'appBar'}>
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;

