import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Item separator
const ItemSeparator = ({ style }) => <View style={[styles.separator, style]} />;
export default ItemSeparator;

