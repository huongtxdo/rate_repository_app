import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  appBarTab: {
    padding: 10,
  },
});

const AppBarTab = ({ text, path, ...props }) => {
  return path ? (
    <Link style={styles.appBarTab} to={path}>
      <Text fontWeight={'bold'} color={'appBar'}>
        {text}
      </Text>
    </Link>
  ) : (
    <Pressable style={styles.appBarTab} {...props}>
      <View>
        <Text fontWeight={'bold'} color={'appBar'}>
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default AppBarTab;

