import { FlatList, Pressable } from 'react-native';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeperator';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

export const RepositoryListContainer = ({ repositories, onPress }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable key={item.id} onPress={() => onPress(item.id)}>
          <RepositoryItem repository={item} />
        </Pressable>
      )}
    />
  );
};

// Repository List
const RepositoryList = () => {
  const { repositories } = useRepositories();

  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={(id) => {
        navigate(`/repositories/${id}`);
      }}
    />
  );
};

export default RepositoryList;

