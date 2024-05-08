import { render, within } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList';
import handleThousands from '../../utils/handleThousands';

const checkTextWithinItem = (
  item,
  {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
  }
) => {
  expect(within(item).getByText(fullName)).toBeDefined();
  expect(within(item).getByText(description)).toBeDefined();
  expect(within(item).getByText(language)).toBeDefined();
  expect(within(item).getByText(handleThousands(forksCount))).toBeDefined();
  expect(
    within(item).getByText(handleThousands(stargazersCount))
  ).toBeDefined();
  expect(within(item).getByText(handleThousands(ratingAverage))).toBeDefined();
  expect(within(item).getByText(handleThousands(reviewCount))).toBeDefined();
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      // Add your test code here
      const { getAllByTestId } = render(
        <RepositoryListContainer repositories={repositories} />
      );

      const repositoryItems = getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // expect something from the first and the second repository item
      let firstItemData = repositories.edges[0].node;
      let secondItemData = repositories.edges[1].node;
      delete firstItemData[('id', 'ownerAvatarUrl')];
      delete secondItemData[('id', 'ownerAvatarUrl')];

      checkTextWithinItem(firstRepositoryItem, firstItemData);
      checkTextWithinItem(secondRepositoryItem, secondItemData);
    });
  });
});

