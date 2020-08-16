import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_USERS_RATINGS } from '../graphql/queries';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    height: 3,
    backgroundColor: "lightgray"
  },
  list: {
    margin: 3
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  itemName: {
    width: 110,
    flexGrow: 3
  },
  itemCount: {
    alignSelf: 'flex-end'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const UserItem = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemName}>{item.username}</Text>
      <Text style={styles.itemCount}>{item.reviews.edges.length} reviews</Text>
    </View>
  );
};

const UserList = () => {
  const { data, error, loading } = useQuery(
    GET_USERS_RATINGS, {
      fetchPolicy: 'cache-and-network',
    }
  );

  const byReviews = (u1, u2) => u2.reviews.edges.length - u1.reviews.edges.length;

  const users = data ? data.users.edges.map(edge=>edge.node).sort(byReviews) : [];

  return (
    <View style={styles.list} >
      <FlatList
        data={users}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={UserItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default UserList;
