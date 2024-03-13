import { Pressable } from 'react-native';
import Text from './Text';

const AppBarTab = (props) => {
  const { text, keyPressed } = props;
  return (
    <Pressable onPress={keyPressed}>
      <Text fontWeight={'bold'} color={'appBar'}>
        {text}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;

