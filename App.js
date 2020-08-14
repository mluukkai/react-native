import React from 'react';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/react-hooks';
import { ENV } from 'react-native-dotenv';

import Main from './src/components/Main';
import createApolloClient from './src/utils/ apolloClient';

const apolloClient = createApolloClient();

const App = () => {
  console.log('ENV',ENV);
  
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
};


export default App;