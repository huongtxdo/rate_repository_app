import { gql } from '@apollo/client';

import { CURRENT_USER_FRAGMENT } from './fragments';

export const SIGN_IN = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...currentUserFragment
      }
    }
  }
  ${CURRENT_USER_FRAGMENT}
`;
