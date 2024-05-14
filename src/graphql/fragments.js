import { gql } from '@apollo/client';

export const GET_REPOSITORIES_FRAGMENT = gql`
  fragment getRepositoriesFragment on Repository {
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    id
    ownerAvatarUrl
    url
  }
`;

export const CURRENT_USER_FRAGMENT = gql`
  fragment currentUserFragment on User {
    id
    username
    createdAt
  }
`;

export const REVIEW_FRAGMENT = gql`
  fragment reviewFragment on Review {
    id
    createdAt
    rating
    text
  }
`;

