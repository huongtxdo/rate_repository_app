import { TextInput } from 'react-native';

import theme from '../theme';

const CustomTextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    style,
    error && {
      borderColor: theme.colors.error,
    },
  ];

  return <TextInput style={textInputStyle} {...props} />;
};

export default CustomTextInput;

