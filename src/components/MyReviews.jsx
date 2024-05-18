import { FlatList } from 'react-native';

import Review from './Review';
import useCurrentUser from '../hooks/useCurrentUser';
import ItemSeparator from './ItemSeperator';

const MyReviews = () => {
  const { currentUser } = useCurrentUser({ includeReviews: true });
  const reviewsNode = currentUser
    ? currentUser.reviews.edges.map(({ node }) => node)
    : [];

  return (
    <FlatList
      data={reviewsNode}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Review review={item} title={item.repository.fullName} />
      )}
    />
  );
};

export default MyReviews;

