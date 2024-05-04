import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import useCurrentUser from '../hooks/useCurrentUser';
import useSignOut from '../hooks/useSignOut';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    alignItems: 'flex-start',
    backgroundColor: theme.backgroundColors.appBar,
    padding: 20,
    // width: '100%',
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  // const data = useCurrentUser();
  const { data } = useQuery(GET_CURRENT_USER);
  const currentUser = data?.me;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repositories'} path={'/'} />
        {currentUser ? (
          <AppBarTab text={'Sign out'} onPress={onSignOut} />
        ) : (
          <AppBarTab text={'Sign in'} path={'/signin'} />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;

