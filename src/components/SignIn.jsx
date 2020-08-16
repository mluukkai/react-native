import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useHistory } from 'react-router-native';

import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';

const SignIn = () => {
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const [signIn] = useSignIn();
  const history = useHistory();

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      await signIn({ username, password });
      const msg = `'${username}' logged in... see token from logs`;
      setMsg(msg);
      history.push('/');
    } catch (error) {
      setErr("invalid credentials");
    } 
  };

  return (
    <View>
      <Text style={{margin:10, color:"green", fontSize: 20}}>
        {msg}
      </Text>
      {err&&<Text style={{margin:10, color:"red", fontSize: 20}}>
        {err}
      </Text>}
      <SignInContainer onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
