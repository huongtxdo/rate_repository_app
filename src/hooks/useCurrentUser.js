import { useQuery } from '@apollo/client';

import { GET_CURRENT_USER } from '../graphql/queries';

const useCurrentUser = (variables) => {
  const { data, ...result } = useQuery(GET_CURRENT_USER, {
    fetchPolicy: 'cache-and-network',
    variables,
  });
  return { currentUser: data ? data.me : undefined, ...result };
};

export default useCurrentUser;

