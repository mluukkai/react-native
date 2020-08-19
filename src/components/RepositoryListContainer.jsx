import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray"
  }
});

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    backgroundColor: 'lightgray',
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
});

const ItemSeparator = () => <View style={styles.separator} />;

export const Dropdown = ({ onChange, value }) => {
  return (
    <PickerSelect
      style={pickerStyles}
      onValueChange={onChange}
      items={[
          { label: 'Latest', value: 'Latest' },
          { label: 'Highest rated', value: 'Highest' },
          { label: 'Lowest rated', value: 'Lowest' },
      ]}
      value={value}
    />
  );
};
const RepositoryListContainer = ({ repositories, onChange, value }) => {
  const repositoryNodes = repositories.edges
    ? repositories.edges.map(edge => edge.node) 
    : [];

  return (
    <FlatList
      ListHeaderComponent={<Dropdown onChange={onChange} value={value} />}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};


export default RepositoryListContainer;