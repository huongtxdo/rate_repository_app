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
  const { data, ...result } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repository = data?.repository;

  const reviewNodes = repository
    ? repository.reviews.edges.map(({ node }) => node)
    : [];

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
    />
  );
};

export default SingleRepository;

