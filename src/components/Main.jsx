import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import About from './About';
import AppBar from './AppBar';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/signin" exact>
          <RepositoryList />
        </Route>
        <Route path="/" exact>
          <SignIn />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
    </View>
  );
};

export default Main;