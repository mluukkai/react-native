import React from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import ReviewItem from './ReviewItem';
import { MY_REVIEWS } from '../graphql/queries';

const styles = StyleSheet.create({
  item: {
    padding: 5
  },
  separator: {
    height: 10,
    backgroundColor: "lightgray"
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { data, error, loading } = useQuery(
    MY_REVIEWS, {
      fetchPolicy: 'cache-and-network',
    }
  );

  if (!data) return null;

  const reviews = data.authorizedUser.reviews.edges;

  return(
    <View>
      <View>
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item.node} reponame={true}/>}
          keyExtractor={({ node }) => node.id}
          ItemSeparatorComponent={ItemSeparator}
        />
      </View>
    </View>
  );
};

export default MyReviews;