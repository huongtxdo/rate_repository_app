import { gql } from '@apollo/client';

import {
  USER_FRAGMENT,
  REVIEW_FRAGMENT,
  REPOSITORY_FRAGMENT,
} from './fragments';

export const SIGN_IN = gql`
  mutation authorize($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
      user {
        ...userFragment
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const CREATE_REVIEW = gql`
  mutation createReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      ...reviewFragment
      repository {
        ...repositoryFragment
      }
    }
  }
  ${REVIEW_FRAGMENT}
  ${REPOSITORY_FRAGMENT}
`;

export const SIGN_UP = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(user: $user) {
      ...userFragment
    }
  }
  ${USER_FRAGMENT}
`;

