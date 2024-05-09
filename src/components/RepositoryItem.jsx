import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

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
    backgroundColor: theme.backgroundColors.languageTag,
    borderRadius: 5,
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
  openGithubButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.backgroundColors.languageTag,
    borderRadius: 5,
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

const OpenGithubButton = ({ onPress }) => {
  return (
    <Pressable style={styles.openGithubButton} onPress={onPress}>
      <Text
        style={{ ...styles.languageTag, fontWeight: theme.fontWeights.bold }}
      >
        Open in GitHub
      </Text>
    </Pressable>
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
    url = 'www.google.com',
  } = props;

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
          <Text style={{ ...styles.languageTag, alignSelf: 'flex-start' }}>
            {language}
          </Text>
        </View>
      </View>

      <View style={styles.achievements}>
        <Achievement value={stargazersCount} label={'Stars'} />
        <Achievement value={forksCount} label={'Forks'} />
        <Achievement value={reviewCount} label={'Reviews'} />
        <Achievement value={ratingAverage} label={'Rating'} />
      </View>
      <OpenGithubButton
        onPress={() => {
          Linking.openURL(url);
        }}
      />
    </View>
  );
};

export default RepositoryItem;

