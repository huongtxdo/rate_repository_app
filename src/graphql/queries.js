import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      totalCount
      edges {
        node {
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          id
          ownerAvatarUrl
        }
      }
    }
  }
`;

