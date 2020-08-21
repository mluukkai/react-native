import React from 'react';
import { FlatList, View, StyleSheet, TextInput, Text } from 'react-native';
import PickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: "lightgray"
  },
  search: {
    height: 20,
    margin: 10
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

const Dropdown = ({ onChange, value }) => {
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

const Search = ({ onChange, value }) => {
  return (
    <TextInput
      placeholder={"type to limit search"}
      style={styles.search}
      value={value}
      onChangeText={onChange}
    />
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <View>
        <Search onChange={this.props.onSeachChange} value={this.props.search}/>
        <Dropdown onChange={this.props.onChange} value={this.props.value} />
      </View>
    );
  };

  render() {
    const repositoryNodes = this.props.repositories.edges
    ? this.props.repositories.edges.map(edge => edge.node) 
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => <RepositoryItem item={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

export default RepositoryListContainer;