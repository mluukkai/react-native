import React, {useContext, useState} from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

import AuthStorageContext from '../contexts/AuthStorageContext';
import useSignIn from '../hooks/useSignIn';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required'),
  password: yup
    .string()
    .required('password is required'),
});

const styles = StyleSheet.create({
  form: {
    flexGrow: 1,
    flexShrink: 1,
    margin: 10
  },
  fields: {
    marginTop: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    flexGrow: 1,
  },
  fieldsError: {
    borderColor: "red"
  },
  signinButton: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  signinText: {
    color: "white",
    textAlign: 'center',
    paddingBottom: 10
  },
});

const LoginForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');

  const fieldError = (meta) =>
    meta.error&&meta.touched&&styles.fieldsError;

  return (
    <View style={styles.form}>
      <FormikTextInput
        style={[styles.fields, fieldError(usernameMeta)]}
        name="username" placeholder="username"
      />
      <FormikTextInput 
        style={[styles.fields, fieldError(passwordMeta)]}
        name="password" placeholder="password" 
        secure={true}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.signinButton}>
          <Text style={styles.signinText}>Sign in</Text>
        </View>  
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignIn = () => {
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);

  const [signIn, result] = useSignIn();
  const authStorage = useContext(AuthStorageContext);

  const initialValues = {
    username: 'kalle',
    password: 'password',
  };

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;

    try {
      const response = await signIn({ username, password });
      const token = response.data.authorize.accessToken;
      await authStorage.setAccessToken(token);
      const x = await authStorage.getAccessToken();
      console.log('token:', x);
      const msg = `${username} logged in... with pwd ${password} see token from logs`;
      setMsg(msg);
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
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignIn;
