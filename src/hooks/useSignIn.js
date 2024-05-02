import { useMutation, useApolloClient } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const [authenticate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const payload = await authenticate({
      variables: { credentials: { username, password } },
    });
    const { data } = payload;
    if (data?.authenticate) {
      await authStorage.setAccessToken(data.authenticate.setAccessToken);
      apolloClient.resetStore();
    }
    return payload;
  };

  return [signIn, result];
};

export default useSignIn;

