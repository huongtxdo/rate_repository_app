import { View, Text, Image, StyleSheet } from 'react-native';

import theme from '../theme';
import handleThousands from '../utils/handleThousands';

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
    flexShrink: 1, // wrap text
  },
  fullname: {
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    marginBottom: 3,
  },
  description: {
    marginVertical: 3,
    color: theme.colors.textSecondary,
    flexShrink: 1,
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

const Achievement = ({ value, label }) => {
  return (
    <View style={styles.achievement}>
      <Text style={styles.fullname}>{handleThousands(value)}</Text>
      <Text style={styles.description}>{label}</Text>
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
    <View testID="repositoryItem" style={styles.repositoryItem}>
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
        <Achievement value={stargazersCount} label={'Stars'} />
        <Achievement value={forksCount} label={'Forks'} />
        <Achievement value={reviewCount} label={'Reviews'} />
        <Achievement value={ratingAverage} label={'Rating'} />
      </View>
    </View>
  );
};

export default RepositoryItem;

