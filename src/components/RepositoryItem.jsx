import { View, Image, StyleSheet, Pressable } from 'react-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import theme from '../theme';
import handleThousands from '../utils/handleThousands';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.backgroundColors.white,
  },
  imageAndInfoContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  imageContainer: {
    marginVertical: 10,
    flexGrow: 0,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  infoContainer: {
    flexGrow: 1,
    margin: 10,
    flexShrink: 1, // wrap text
  },
  fullname: {
    marginBottom: 3,
  },
  description: {
    marginVertical: 3,
    flexShrink: 1,
    flexGrow: 1,
  },
  languageTagContainer: {
    marginTop: 3,
    flexDirection: 'row',
  },
  languageTag: {
    color: theme.colors.white,
    backgroundColor: theme.backgroundColors.blue,
    borderRadius: 5,
    padding: 3,
    flexGrow: 0,
  },
  achievementContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  achievement: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openGithubButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: theme.backgroundColors.blue,
    borderRadius: 5,
  },
});

const Achievement = ({ value, label }) => {
  return (
    <View style={styles.achievement}>
      <Text style={styles.fullname} fontSize="subheading" fontWeight="bold">
        {handleThousands(value)}
      </Text>
      <Text style={styles.description} color="textSecondary">
        {label}
      </Text>
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

const RepositoryItem = ({ repository, openInGithub = false, ...props }) => {
  const {
    fullName,
    description,
    language,
    stargazersCount,
    forksCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl,
    url,
  } = repository;

  return (
    <View testID="container" style={styles.container}>
      <View style={styles.imageAndInfoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: ownerAvatarUrl,
            }}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.fullname} fontSize="subheading" fontWeight="bold">
            {fullName}
          </Text>
          <Text style={styles.description} color="textSecondary">
            {description}
          </Text>
          <View style={styles.languageTagContainer}>
            <Text style={{ ...styles.languageTag, alignSelf: 'flex-start' }}>
              {language}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.achievementContainer}>
        <Achievement value={stargazersCount} label={'Stars'} />
        <Achievement value={forksCount} label={'Forks'} />
        <Achievement value={reviewCount} label={'Reviews'} />
        <Achievement value={ratingAverage} label={'Rating'} />
      </View>
      {openInGithub && url && (
        <OpenGithubButton
          onPress={() => {
            Linking.openURL(url);
          }}
        />
      )}
    </View>
  );
};

export default RepositoryItem;

