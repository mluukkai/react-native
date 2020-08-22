import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Route, Switch, Redirect, useHistory } from 'react-router-native';

import RepositoryList from './RepositoryList';
import UserList from './UserList';
import SignIn from './SignIn';
import SignUp from './SignUp';
import About from './About';
import AppBar from './AppBar';
import theme from '../theme';
import SingleRepositoryItem from './SingleRepositoryItem';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  const history = useHistory();
  //history.push('/repositories/jaredpalmer.formik');

  return (
    <View style={styles.container}>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <RepositoryList />
        </Route>
        <Route path="/repositories/:id" exact>
          <SingleRepositoryItem />
        </Route>
        <Route path="/users" exact>
          <UserList />
        </Route>
        <Route path="/review" exact>
          <ReviewForm />
        </Route>        
        <Route path="/signin" exact>
          <SignIn />
        </Route>
        <Route path="/signup" exact>
          <SignUp />
        </Route>
        <Route path="/reviews" exact>
          <MyReviews />
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

/*

  const items = [{ id: "1"}, { id: "2"}];
  for (let i =3; i<25; i++) 
    items.push({ id: String(i)});
    
      <FlatList
        data={items}
        renderItem={({item}) => <Text>z</Text>}
        keyExtractor={item => item.id}
        onEndReached={()=>console.log('called')}
        onEndReachedThreshold={0.5}
      />

      */