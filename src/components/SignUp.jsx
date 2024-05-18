import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { SIGN_UP } from '../graphql/mutations';

import theme from '../theme';
import Text from './Text';
import Pressable from './Pressable';
import CustomTextInput from './CustomTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: 'auto',
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required(`Username is required`)
    .min(5, `Username must be at least 5 characters`)
    .max(30, `Username must be at most 30 characters`),
  password: yup
    .string()
    .required(`Password is required`)
    .min(5, `Password must be at least 5 characters`)
    .max(30, `Password must be at most 30 characters`),
  passwordConfirmation: yup
    .string()
    .required(`Password confirmation is required`)
    .oneOf(
      [yup.ref('password'), null],
      `Password confirmation does not match password`
    ),
});

const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Username"
        style={{ marginBottom: 5 }}
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
        style={{ marginBottom: 5 }}
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

      <CustomTextInput
        placeholder="Password confirmation"
        style={{ marginBottom: 5 }}
        error={
          formik.touched.passwordConfirmation &&
          formik.errors.passwordConfirmation
        }
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text color={'error'} style={{ paddingBottom: 10 }}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable onPress={formik.handleSubmit}>Sign up</Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(SIGN_UP);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(`error: `, e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;

