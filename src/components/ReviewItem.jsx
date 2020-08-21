import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';
import { MY_REVIEWS } from '../graphql/queries';

import { useMutation } from '@apollo/react-hooks';

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

const buttonStyles = StyleSheet.create({
  panel: {
    flexDirection: "row",
    margin: 10
  },
  view: {
    flexGrow: 1,
    width: 100,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: "blue",
    borderRadius: 10,
    height: 40
  },
  remove: {
    flexGrow: 1,
    width: 100,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    backgroundColor: "red",
    borderRadius: 10,
    height: 40
  },
  text: {
    color: "white",
    textAlign: 'center',
    fontWeight: "bold"
  },
});

const ReviewItem = ({ review, reponame }) => {
  const f = (t) =>
    (new Date(t)).toLocaleDateString().replace('/','.').replace('/','.');

  const history = useHistory();
  const url = `/repositories/${review.repository.id}`; 
  const [remove, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [ { query: MY_REVIEWS } ]
  });

  const removeReview = async () => {
    const onOkPress = async () => {
      const response = await remove({ variables: { id : review.id} });
      console.log(response);
    };
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: onOkPress}
      ],
      { cancelable: false }
    );


  };

  const buttons = () => {
    if ( !reponame ) return null;

    return (
      <View style={buttonStyles.panel}>
        <View style={buttonStyles.view}>
          <TouchableWithoutFeedback onPress={() => history.push(url)}>
            <View>
              <Text style={buttonStyles.text}>
                View repository
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={buttonStyles.remove}>
          <TouchableWithoutFeedback onPress={removeReview}>
            <View>
                <Text style={buttonStyles.text}>
                  Delete review
                </Text>
              </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={{ marginTop: 5 }}></View>
      <View style={styles.row}>
        <Text style={styles.score}>{review.rating}</Text>
        <View style={styles.numDate}>
          <Text style={styles.name}>{reponame?review.repository.fullName:review.user.username}</Text>
          <Text style={styles.date}>{f(review.createdAt)}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.empty}></Text>
        <Text style={styles.text}>{review.text}</Text>
      </View>
      {buttons()}
    </View>
  );
};

export default ReviewItem;