import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';

import Main from './src/components/Main';
//import createApolloClient from './src/utils/apolloClient';
import AuthStorageContext from './src/contexts/AuthStorageContext';

import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';
const base = Constants.manifest.extra.apollo_uri;

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();

        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: `${base}:5000/graphql`,
  });
};

import { AsyncStorage } from 'react-native';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  key = `${this.namespace}:token`

  async getAccessToken() {
    return await AsyncStorage.getItem(this.key);
  }

  async setAccessToken(accessToken) {
    await AsyncStorage.setItem(this.key, accessToken);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.key);
  }
}

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const App = () => {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <AuthStorageContext.Provider value={authStorage}>
            <Main />
          </AuthStorageContext.Provider>
      </ApolloProvider>
    </NativeRouter>
  );
};


export default App;