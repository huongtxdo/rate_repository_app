import { gql } from '@apollo/client';

import {
  GET_REPOSITORIES_FRAGMENT,
  CURRENT_USER_FRAGMENT,
  REVIEW_FRAGMENT,
} from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories {
    repositories {
      edges {
        node {
          ...getRepositoriesFragment
        }
      }
    }
  }
  ${GET_REPOSITORIES_FRAGMENT}
`;

export const GET_CURRENT_USER = gql`
  query currentUser {
    me {
      ...currentUserFragment
    }
  }
  ${CURRENT_USER_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...getRepositoriesFragment
      reviews {
        edges {
          node {
            ...reviewFragment
            user {
              username
            }
          }
        }
      }
    }
  }
  ${GET_REPOSITORIES_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

