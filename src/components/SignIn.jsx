import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';

import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import CustomTextInput from './CustomTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  signInContainer: {
    display: 'flex',
    backgroundColor: theme.backgroundColors.white,
    alignItems: 'stretch',
    padding: 10,
    height: 'auto',
  },
  textInput: {
    color: theme.colors.textSecondary,
    borderRadius: 3,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    // marginBottom: 5,
    padding: 10,
  },
  pressableButton: {
    backgroundColor: theme.backgroundColors.languageTag,
    borderRadius: 3,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
  signInText: {
    fontWeight: theme.fontWeights.bold,
    color: theme.colors.appBar,
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
    <View style={styles.signInContainer}>
      <CustomTextInput
        placeholder="Username"
        error={formik.touched.username && formik.errors.username}
        style={styles.textInput}
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error, paddingBottom: 10 }}>
          {formik.errors.username}
        </Text>
      )}

      <CustomTextInput
        placeholder="Password"
        error={formik.touched.password && formik.errors.password}
        style={styles.textInput}
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error, paddingBottom: 10 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable
        style={styles.pressableButton}
        onPress={(signin) => {
          !(formik.errors.username || formik.errors.password) &&
            formik.handleSubmit(signin);
        }}
      >
        <Text style={styles.signInText}>Sign in</Text>
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.signInContainer}>
      <CustomTextInput
        error={formik.touched.username && formik.errors.username}
        style={styles.textInput}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: theme.colors.error, paddingBottom: 10 }}>
          {formik.errors.username}
        </Text>
      )}

      <CustomTextInput
        error={formik.touched.password && formik.errors.password}
        style={styles.textInput}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: theme.colors.error, paddingBottom: 10 }}>
          {formik.errors.password}
        </Text>
      )}
      <Pressable
        style={styles.pressableButton}
        onPress={(signin) => {
          !(formik.errors.username || formik.errors.password) &&
            formik.handleSubmit(signin);
        }}
      >
        <Text style={styles.signInText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;

