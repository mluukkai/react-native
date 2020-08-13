import React, {useState} from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';

import * as yup from 'yup';

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

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values) => {
    const username = values.username;
    const password = values.password;

    const msg = `${username} logged in... with pwd ${password}`;
    setMsg(msg);
  };

  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
      <Text style={{margin:10, color:"green", fontSize: 20}}>
        {msg}
      </Text>
    </View>
  );
};

export default SignIn;
