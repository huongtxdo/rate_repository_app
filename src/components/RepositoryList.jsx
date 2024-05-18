import React, { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { FlatList, Pressable, View, StyleSheet, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeperator';
import useRepositories from '../hooks/useRepositories';
import theme from '../theme';
import CustomTextInput from './CustomTextInput';

const styles = StyleSheet.create({
  picker: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  },
});

const variables = {
  latest: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRated: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRated: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const DropDown = ({ value, setValue }) => {
  if (value === null) value = 'latest';
  else
    return (
      <View>
        <RNPickerSelect
          placeholder={{ label: 'Select an item...', value: '' }}
          style={styles.picker}
          // value={value}
          onValueChange={(value) => setValue(value)}
          items={[
            { label: 'Latest repositories', value: 'latest' },
            {
              label: 'Highest rated repositories',
              value: 'highestRated',
            },
            {
              label: 'Lowest rated repositories',
              value: 'lowestRated',
            },
          ]}
        />
      </View>
    );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { value, setValue, searchKeyword, setSearchKeyword } = this.props;

    return (
      <View>
        <ItemSeparator style={{ backgroundColor: theme.colors.white }} />
        <CustomTextInput
          placeholder="Search repositories..."
          value={searchKeyword}
          onChangeText={(value) => setSearchKeyword(value)}
          style={{ borderRadius: 0 }}
        />
        <ItemSeparator style={{ backgroundColor: theme.colors.white }} />
        <DropDown value={value} setValue={setValue} />
      </View>
    );
  };

  render() {
    const { repositories, onPress } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => onPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [value, setValue] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debounce] = useDebounce(searchKeyword, 500);

  const { repositories } = useRepositories({
    ...variables[value],
    searchKeyword: debounce,
  });

  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      onPress={(id) => {
        navigate(`/repositories/${id}`);
      }}
      value={value}
      setValue={setValue}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;

