import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';

import useCurrentUser from '../hooks/useCurrentUser';
import { DELETE_REVIEW } from '../graphql/mutations';

import Pressable from './Pressable';
import Review from './Review';
import ItemSeparator from './ItemSeperator';
import theme from '../theme';

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.backgroundColors.white,
    padding: 15,
    justifyContent: 'space-around',
  },
  viewRepositoryButton: {
    flexGrow: 1,
    marginRight: 15,
  },
  deleteReviewButton: {
    flexGrow: 1,
    backgroundColor: theme.colors.error,
    marginRight: 0,
  },
});

const ReviewWithButtons = ({ review, title, style, deleteOnPress }) => {
  const repositoryId = review.repositoryId;
  const navigate = useNavigate();
  return (
    <View>
      <Review review={review} title={title} style={style} />
      <View style={styles.buttonsContainer}>
        <Pressable
          style={styles.viewRepositoryButton}
          onPress={() => navigate(`/repositories/${repositoryId}`)}
        >
          View repository
        </Pressable>
        <Pressable style={styles.deleteReviewButton} onPress={deleteOnPress}>
          Delete review
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { currentUser, refetch } = useCurrentUser({ includeReviews: true });
  const reviewsNode = currentUser
    ? currentUser.reviews.edges.map(({ node }) => node)
    : [];

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const deleteOnPress = async (deleteReviewId) => {
    await deleteReview({ variables: { deleteReviewId } });
    refetch();
  };

  const deleteWithAlert = (deleteOnPress) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            deleteOnPress;
          },
        },
      ]
    );
  };

  return (
    <FlatList
      data={reviewsNode}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ReviewWithButtons
          review={item}
          title={item.repository.fullName}
          deleteOnPress={() => deleteWithAlert(deleteOnPress(item.id))}
        />
      )}
    />
  );
};

export default MyReviews;

