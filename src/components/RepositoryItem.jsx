import { View, Text, Image, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  repositoryItem: {
    display: 'flex',
    backgroundColor: theme.backgroundColors.white,
  },
  imageAndInfo: { flexDirection: 'row', marginLeft: 5 },
  image: {
    flexGrow: 0,
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  info: {
    flexGrow: 1,
    margin: 5,
  },
  fullname: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 3,
  },
  description: {
    marginVertical: 3,
    color: theme.colors.textSecondary,
  },
  languageTag: {
    color: theme.colors.white,
    borderRadius: 5,
    backgroundColor: theme.backgroundColors.languageTag,
    alignSelf: 'flex-start',
    padding: 3,
    marginVertical: 3,
  },
  achievements: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  achievement: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

const Achievement = ({ value, name }) => {
  const valueAdjusted =
    value >= 1000 ? Math.round((value * 10) / 1000) / 10 + 'k' : value;
  return (
    <View style={styles.achievement}>
      <Text style={styles.fullname}>{valueAdjusted}</Text>
      <Text style={styles.description}>{name}</Text>
    </View>
  );
};

const RepositoryItem = ({ props }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
  } = props;
  // console.log('stargazersCount', stargazersCount);

  return (
    <View style={styles.repositoryItem}>
      <View style={styles.imageAndInfo}>
        <Image
          style={styles.image}
          source={{
            uri: ownerAvatarUrl,
          }}
        />
        <View style={styles.info}>
          <Text style={styles.fullname}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.languageTag}>{language}</Text>
        </View>
      </View>

      <View style={styles.achievements}>
        <Achievement value={stargazersCount} name={'Stars'} />
        <Achievement value={forksCount} name={'Forks'} />
        <Achievement value={reviewCount} name={'Reviews'} />
        <Achievement value={ratingAverage} name={'Rating'} />
      </View>
    </View>
  );
};

export default RepositoryItem;

