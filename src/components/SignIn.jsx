import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import Pressable from './Pressable';
import theme from '../theme';
import CustomTextInput from './CustomTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.white,
    padding: 10,
    height: 'auto',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Username"
        error={formik.touched.username && formik.errors.username}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text color={'error'} style={{ paddingBottom: 10 }}>
          {formik.errors.username}
        </Text>
      )}

      <CustomTextInput
        placeholder="Password"
        error={formik.touched.password && formik.errors.password}
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text color={'error'} style={{ paddingBottom: 10 }}>
          {formik.errors.password}
        </Text>
      )}

      <Pressable
        onPress={(signin) => {
          !(formik.errors.username || formik.errors.password) &&
            formik.handleSubmit(signin);
        }}
      >
        Sign in
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signIn({ username, password });
      navigate('/', { replace: true });
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

export default SignIn;

