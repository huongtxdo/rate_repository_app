import { StyleSheet, View } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.backgroundColors.main,
  },
});

const Main = () => {
  return (
    <>
      <View style={styles.container}>
        <AppBar />
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route
            exact
            path="/repositories/:id"
            element={<SingleRepository />}
          />
          <Route exact path="/create-review" element={<ReviewForm />} />
          <Route exact path="/my-reviews" element={<MyReviews />} />
          <Route exact path="/" element={<RepositoryList />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </>
  );
};

export default Main;

