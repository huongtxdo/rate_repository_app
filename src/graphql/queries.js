import { gql } from '@apollo/client';

import {
  REPOSITORY_FRAGMENT,
  USER_FRAGMENT,
  REVIEW_FRAGMENT,
} from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...repositoryFragment
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
`;

export const GET_CURRENT_USER = gql`
  query currentUser($includeReviews: Boolean = false) {
    me {
      ...userFragment
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...reviewFragment
            repository {
              fullName
            }
          }
        }
      }
    }
  }
  ${USER_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!) {
    repository(id: $id) {
      ...repositoryFragment
      reviews {
        edges {
          node {
            ...reviewFragment
          }
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
`;

