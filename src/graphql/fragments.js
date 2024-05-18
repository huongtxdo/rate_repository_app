import { gql } from '@apollo/client';

export const REPOSITORY_FRAGMENT = gql`
  fragment repositoryFragment on Repository {
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

export const USER_FRAGMENT = gql`
  fragment userFragment on User {
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
    repositoryId
  }
`;

