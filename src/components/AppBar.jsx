import React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useLocation } from 'react-router-native';

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
  active: {
    backgroundColor: "darkgrey"
  },
});

const AppBarTab = ({ text, target }) => {
  const location = useLocation();
  const path = location.pathname;

  console.log(path, target, path==target);
  return (
    <View>
      <TouchableWithoutFeedback>
        <View style={[styles.item, path==target&&styles.active]}>
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
        <AppBarTab text={"users"} target={"/users"} />
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