import { useMutation } from '@apollo/client';

import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [authenticate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    const result = await authenticate({
      variables: { credentials: { username, password } },
    });
    return result;
  };

  return [signIn, result];
};

export default useSignIn;

