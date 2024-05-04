import useAuthStorage from './useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

const useSignOut = async () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  await authStorage.removeAccessToken();
  apolloClient.resetStore();
  navigate('/');
};

export default useSignOut;

