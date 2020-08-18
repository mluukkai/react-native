import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",  
  },
  score: {
    marginTop: 0,
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 22,
    flexBasis: 80,
    fontSize: 25,
    textAlign: "center",
    borderRadius: 40,
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 2,
    color: "blue",
    width: 80,
    height: 80
  },
  nameDate: {
    flexGrow: 1,
    margin: 5,
    flexDirection: "column",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 5,
    flexGrow: 1,
    margin: 5,
  },
  date: {
    fontSize: 14,
    color: "grey",
    flexGrow: 1,
    margin: 5,
  },
  empty: {
    flexGrow: 1,
    flexBasis: 82,
    flexShrink: 0
  },
  text: {
    flexGrow: 1,
    width: 250,
    margin: 10,
  }
});

const ReviewItem = ({ review }) => {
  const f = (t) =>
    (new Date(t)).toLocaleDateString().replace('/','.').replace('/','.');

  return (
    <View>
      <View style={{ marginTop: 5 }}></View>
      <View style={styles.row}>
        <Text style={styles.score}>{review.rating}</Text>
        <View style={styles.numDate}>
          <Text style={styles.name}>{review.user.username}</Text>
          <Text style={styles.date}>{f(review.createdAt)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.empty}></Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
      
    </View>
  );
};

export default ReviewItem;