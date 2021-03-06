import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import { useHistory } from 'react-router-native';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphql/mutations';
import FormikTextInput from './FormikTextInput';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is required')
    .min(1)
    .max(30),
  password: yup
    .string()
    .min(5)
    .max(30)
    .required('password is required'),
  confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], "Passwords don't match")
    .required('Password confirm is required')
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

const SignupForm = ({ onSubmit }) => {
  const [usernameField, usernameMeta, usernameHelpers] = useField('username');
  const [passwordField, passwordMeta, passwordHelpers] = useField('password');
  const [confirmationField, confirmationMeta, confirmationHelpers] = useField('confirmation');

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
      <FormikTextInput 
        style={[styles.fields, fieldError(confirmationMeta)]}
        name="confirmation" placeholder="password confirmation" 
        secure={true}
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.signinButton}>
          <Text style={styles.signinText}>Sign up</Text>
        </View>  
      </TouchableWithoutFeedback>
    </View>
  );
};

const SignUp = () => {
  const initialValues = {
    username: '',
    password: '',
    confirmation: ''
  };

  const [create, result] = useMutation(CREATE_USER);
  const history = useHistory();

  const onSubmit = async (values) => {
    const username = values.username;
    const password = values.password;
    const response = await create({ variables: { username, password } });
    console.log(response);
    history.push("/");
  };

  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignupForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default SignUp;