import { StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { CREATE_REVIEW } from '../graphql/mutations';

import theme from '../theme';
import Text from './Text';
import Pressable from './Pressable';
import CustomTextInput from './CustomTextInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    height: 'auto',
  },
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required(`Repository owner's username is required`),
  repositoryName: yup.string().required(`Repository's name is required`),
  rating: yup
    .number(`Rating must be a number`)
    .min(0, `Rating must be at least 0`)
    .max(100, `Rating must be at most 100`)
    .required(`Rating is required`),
  text: yup.string(),
});

const ReviewFormContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <CustomTextInput
        placeholder="Repository owner's username"
        style={{ marginBottom: 5 }}
        error={formik.touched.ownerName && formik.errors.ownerName}
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color={'error'} style={{ paddingBottom: 10 }}>
          {formik.errors.ownerName}
        </Text>
      )}

      <CustomTextInput
        placeholder="Repository's name"
        style={{ marginBottom: 5 }}
        error={formik.touched.repositoryName && formik.errors.repositoryName}
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color={'error'} style={{ paddingBottom: 10 }}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <CustomTextInput
        placeholder="Rating between 0 and 100"
        style={{ marginBottom: 5 }}
        inputMode="numeric"
        error={formik.touched.rating && formik.errors.rating}
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text color={'error'} style={{ paddingBottom: 10 }}>
          {formik.errors.rating}
        </Text>
      )}

      <CustomTextInput
        placeholder="Write a review..."
        style={{ marginBottom: 5 }}
        multiline
        error={formik.touched.text && formik.errors.text}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
      />
      {formik.touched.text && formik.errors.text && (
        <Text color={'error'} style={{ paddingBottom: 10 }}>
          {formik.errors.text}
        </Text>
      )}

      <Pressable onPress={formik.handleSubmit}>Create a review</Pressable>
    </View>
  );
};

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const onSubmit = async (values) => {
    const review = { ...values, rating: parseInt(values.rating) };
    try {
      const payload = await createReview({ variables: { review } });
      const { data } = payload;
      if (data?.createReview) {
        navigate(`/repositories/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log('error: ', e);
    }
  };

  return (
    <View>
      <ReviewFormContainer onSubmit={onSubmit} />
    </View>
  );
};

export default ReviewForm;

