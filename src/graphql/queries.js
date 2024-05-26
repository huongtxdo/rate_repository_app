import { gql } from '@apollo/client';

import {
  REPOSITORY_FRAGMENT,
  USER_FRAGMENT,
  REVIEW_FRAGMENT,
  PAGE_INFO_FRAGMENT,
} from './fragments';

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

export const GET_REPOSITORIES = gql`
  query repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
    ) {
      edges {
        node {
          ...repositoryFragment
        }
        cursor
      }
      pageInfo {
        ...pageInfoFragment
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $reviewsFirst: Int, $after: String) {
    repository(id: $id) {
      ...repositoryFragment
      reviews(first: $reviewsFirst, after: $after) {
        edges {
          node {
            ...reviewFragment
          }
        }
        pageInfo {
          ...pageInfoFragment
        }
      }
    }
  }
  ${REPOSITORY_FRAGMENT}
  ${REVIEW_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
`;

