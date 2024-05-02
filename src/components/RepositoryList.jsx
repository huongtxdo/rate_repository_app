import { FlatList, View, StyleSheet, Text } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

// Item separator
const ItemSeparator = () => <View style={styles.separator} />;

// Repository List
const RepositoryList = () => {
  const { repositories } = useRepositories();

  // console.log('repositories', repositories);
  // if (!repositories || !repositories.edges) {
  //   return (
  //     <View>
  //       <Text>no data</Text>
  //     </View>
  //   );
  // }

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  // console.log('repositoryNodes', repositoryNodes);

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem props={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default RepositoryList;

