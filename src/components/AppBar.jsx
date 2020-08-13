import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "gray"
  },
  scrollView: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  item: {
    padding: 10,
    flexGrow: 1,
  },
});

const AppBarTab = ({ text, target }) => {
  return (
    <View>
      <TouchableWithoutFeedback>
        <View style={styles.item}>
          <Link to={target}>
              <Text style={{"color": "white"}}>{text}</Text>
          </Link> 
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text={"repositories"} target={"/"} />
        <AppBarTab text={"signin"} target={"/signin"}/>
        <AppBarTab text={"bmi"} target={"/about"} />
      </ScrollView>
    </View> 
  );
};

export default AppBar;