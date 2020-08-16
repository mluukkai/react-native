import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray"
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories.edges
    ? repositories.edges.map(edge => edge.node) 
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={RepositoryItem}
      keyExtractor={item => item.fullName}
    />
  );
};


export default RepositoryListContainer;