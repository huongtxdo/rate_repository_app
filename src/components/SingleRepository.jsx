import { FlatList, View } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';

import RepositoryItem from './RepositoryItem';
import Review from './Review';
import ItemSeparator from './ItemSeperator';

import { GET_REPOSITORY } from '../graphql/queries';

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { id };
  const { data, fetchMore, loading, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { ...variables, reviewsFirst: 2 },
  });

  const repository = data?.repository;

  const reviewNodes = repository
    ? repository.reviews.edges.map(({ node }) => node)
    : [];

  const handleFetchMore = () => {
    const canFetchMore = !loading && repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;
    // console.log(`SingleRepository onEndReach`);
    fetchMore({
      variables: {
        ...variables,
        after: repository.reviews.pageInfo.endCursor,
      },
    });
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Review review={item} />}
      ListHeaderComponent={() =>
        repository && (
          <View>
            <RepositoryItem repository={repository} openInGithub="true" />
            <ItemSeparator />
          </View>
        )
      }
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
      initialNumToRender={2}
    />
  );
};

export default SingleRepository;

