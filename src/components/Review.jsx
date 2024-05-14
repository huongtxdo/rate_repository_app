import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.white,
    flexDirection: 'row',
  },
  leftContainer: { flexGrow: 0, padding: 10 },
  rightContainer: { flexGrow: 1, flexShrink: 1, paddingVertical: 10 },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.backgroundColors.blue,
    borderStyle: 'solid',
    borderWidth: 1,
  },
  createdAt: {
    marginBottom: 3,
  },
});

const Review = ({ review, title, style }) => {
  const { text, createdAt, rating, user } = review;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.leftContainer}>
        <View style={styles.circle}>
          <Text color="blue" fontWeight="bold" fontSize="subheading">
            {rating}
          </Text>
        </View>
      </View>

      <View style={styles.rightContainer}>
        <Text fontSize="subheading" fontWeight="bold">
          {title ? title : user.username}
        </Text>
        <Text style={styles.createdAt} color="textSecondary">
          {format(new Date(createdAt), 'dd.MM.yyyy')}
        </Text>
        {text && <Text>{text}</Text>}
      </View>
    </View>
  );
};

export default Review;

