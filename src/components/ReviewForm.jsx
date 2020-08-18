import React from 'react';
import { Formik, useField } from 'formik';
import { Text, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import FormikTextInput from './FormikTextInput';
import { REVIEW } from '../graphql/mutations';


const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('owner is required'),
  repo: yup
    .string()
    .required('repository is required'),
  review: yup
    .number()
    .min(0)
    .max(100)
    .required('review should be between 0-100'),
  text: yup
    .string()
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
  textarea: {
    marginTop: 10,
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    flexGrow: 1,
    height: 100
  },
  fieldsError: {
    borderColor: "red"
  },
  button: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexGrow: 1,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    textAlign: 'center',
    paddingBottom: 10
  },
});

const Form = ({ onSubmit }) => {
  const [ownerField, ownerMeta, ownerHelpers] = useField('owner');
  const [repoField, repoMeta, repoHelpers] = useField('repo');
  const [reviewField, reviewMeta, reviewHelpers] = useField('review');
  const [textField, textMeta,textHelpers] = useField('text');

  const fieldError = (meta) =>
    meta.error&&meta.touched&&styles.fieldsError;

  return(
    <View style={styles.form}>
      <FormikTextInput
        style={[styles.fields, fieldError(ownerMeta)]}
        name="owner" placeholder="Reposity owner name"
      />
      <FormikTextInput 
        style={[styles.fields, fieldError(repoMeta)]}
        name="repo" placeholder="Repository" 
      />
      <FormikTextInput
        style={[styles.fields, fieldError(reviewMeta)]}
        keyboardType='number-pad'
        name="review" placeholder="Ranging between 0 and 100"
      />
      <FormikTextInput
        style={[styles.textarea, fieldError(textMeta)]}
        multiline
        name="text" placeholder="Review" 
      />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>create</Text>
        </View>  
      </TouchableWithoutFeedback>
    </View>
  );
};

const ReviewForm = () => {
  const history = useHistory();
  const initialValues = {
    owner: '',
    repo: '',
    review: '',
    text: '',
  };

  const [doReview, result] = useMutation(REVIEW);

  const onSubmit = async ({owner, repo, review, text}) => {

    const variables = {
      repository: repo,
      owner: owner,
      rating: Number(review),
      text 
    };

    const response = await doReview({ variables });
    const url = `/repositories/${response.data.createReview.repositoryId}`;
    history.push(url);
  };

  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <Form onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default ReviewForm;