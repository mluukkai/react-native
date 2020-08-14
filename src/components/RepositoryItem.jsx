import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  item: {
    padding: 5
  },
  main: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
    justifyContent: "flex-start",
  },
  language: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: "blue",
    borderRadius: 10,
    width: 110,
  },
  languageText: {
    color: "white",
    textAlign: 'center'
  },
  image: {
    width: 80,
    height: 80,
    margin: 10
  },
  ratings: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    margin: 10,
    justifyContent: "flex-start"
  },
  rating: {
    flexGrow: 1,
    margin: 10,
    flexDirection: "column",
  },
});

const RepositoryItem = ({ item }) => {
  const avatar = item.ownerAvatarUrl;

  const f = (val) => {
    if (val<100) return val;

    return `${(val/1000).toFixed(1)} k`;
  }; 

  return (
    <View style={styles.item}>
      <View style={styles.main}>
        <View>
          <Image
            style={styles.image}
            source={{ uri: avatar }}
          />      
        </View>
        <View>
          <Text fontWeight='bold' style={{flexGrow: 1, fontSize: 20}}>{item.fullName}</Text>
          <Text style={{flexGrow: 1, fontSize: 15}}>{item.description}</Text> 
          <View style={styles.language}>
            <Text style={styles.languageText}>{item.language}</Text> 
          </View> 
        </View>
      </View>
      
      <View style={styles.ratings}>
        <View style={styles.rating}>
          <Text fontWeight='bold'>{f(item.stargazersCount)}</Text>
          <Text>Star</Text>
        </View>
        <View style={styles.rating}>
          <Text fontWeight='bold'>{f(item.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View style={styles.rating}>
          <Text fontWeight='bold'>{f(item.reviewCount)}</Text>
          <Text>Reviews</Text>
        </View>
        <View style={styles.rating}>
          <Text fontWeight='bold'>{f(item.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      
    </View>
  );
};

export default RepositoryItem;