import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import { useQuery } from '@apollo/react-hooks';
import { useContext } from 'react';
import { useApolloClient } from '@apollo/client';

import AuthStorageContext from '../contexts/AuthStorageContext';
import { AUTHORIZED_USER } from '../graphql/queries';

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

const SignoutTab = () => {
  const client = useApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const signout = () => {
    authStorage.removeAccessToken();
    client.resetStore();
    alert('lol2');
  };

  return (
    <View>
      <TouchableWithoutFeedback onPress={signout}>
        <View style={styles.item}>
            <Text style={{"color": "white"}}>sign out</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const AppBar = () => {
  const { data, error, loading } = useQuery(
    AUTHORIZED_USER
  );

  const user = data ? data.authorizedUser : null;

  console.log(user);

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.scrollView}>
        <AppBarTab text={"repositories"} target={"/"} />
        {user?
          <SignoutTab />:
          <AppBarTab text={"signin"} target={"/signin"}/>
        }
        <AppBarTab text={"bmi"} target={"/about"} />
      </ScrollView>
    </View> 
  );
};

export default AppBar;