import { Text, View } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });
  if (loading) {
    return (
      <View>
        <Text>loading ...</Text>
      </View>
    );
  }
  return data.repositories;
};

export default useRepositories;
// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);
//   const fetchRepositories = async () => {
//     setLoading(true);
//     const response = await fetch('http://192.168.1.226:5000/api/repositories');
//     const json = await response.json();
//     setLoading(false);
//     setRepositories(json);
//   };
//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

