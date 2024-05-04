import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = () => {
  const { data } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if (data) console.log('data', data);

  return data?.me;
};

export default useCurrentUser;

