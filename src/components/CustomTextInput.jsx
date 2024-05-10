import { StyleSheet, TextInput } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    color: theme.colors.textPrimary,
    borderRadius: 3,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    padding: 10,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
  },
});

const CustomTextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    style,
    error && {
      borderColor: theme.colors.error,
    },
  ];

  return <TextInput style={textInputStyle} {...props} />;
};

export default CustomTextInput;

