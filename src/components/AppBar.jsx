import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-start',
    backgroundColor: theme.backgroundColors.appBar,
    padding: 20,
  },
  scrollView: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(GET_CURRENT_USER);
  const currentUser = data?.me;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab text="Repositories" path="/" />
        {currentUser ? (
          <>
            <AppBarTab text={'Create a review'} path={'/create-review'} />
            <AppBarTab text={'Sign out'} onPress={onSignOut} />
          </>
        ) : (
          <>
            <AppBarTab text={'Sign in'} path={'/signin'} />
            <AppBarTab text={'Sign up'} path={'/signup'} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

