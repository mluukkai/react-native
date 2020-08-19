import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray"
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const Dropdown = ({onChange}) => {
  return (
      <PickerSelect
          onValueChange={onChange}
          items={[
              { label: 'Latest', value: 'Latest' },
              { label: 'Highest rated', value: 'Highest' },
              { label: 'Lowest rated', value: 'Lowest' },
          ]}
      />
  );
};
const RepositoryListContainer = ({ repositories, onChange }) => {
  const repositoryNodes = repositories.edges
    ? repositories.edges.map(edge => edge.node) 
    : [];

  return (
    <FlatList
      ListHeaderComponent={<Dropdown onChange={onChange} />}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem item={item} />}
      keyExtractor={item => item.id}
    />
  );
};


export default RepositoryListContainer;