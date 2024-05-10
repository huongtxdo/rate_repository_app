import { Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  appBarTab: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppBarTab = ({ text, path, ...props }) => {
  const commonComponent = (
    <View style={styles.appBarTab}>
      <Text fontWeight={'bold'} color={'appBar'}>
        {text}
      </Text>
    </View>
  );
  return path ? (
    <Link to={path} {...props}>
      {commonComponent}
    </Link>
  ) : (
    <Pressable {...props}>{commonComponent}</Pressable>
  );
};

export default AppBarTab;

