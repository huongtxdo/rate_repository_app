import { Pressable as PrimaryPressable, View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  button: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.backgroundColors.blue,
    borderRadius: 3,
    borderWidth: 1,
  },
});

const Pressable = ({ children, style, ...props }) => {
  return (
    <PrimaryPressable {...props}>
      <View style={[styles.button, style]}>
        <Text color={'button'} fontWeight={'bold'}>
          {children}
        </Text>
      </View>
    </PrimaryPressable>
  );
};

export default Pressable;

