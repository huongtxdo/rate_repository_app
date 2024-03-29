import { Pressable, View, StyleSheet, Platform } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import theme from '../theme';
import CustomTextInput from './CustomTextInput';

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

const SignIn = () => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('Signed in with these values', values);
    },
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

