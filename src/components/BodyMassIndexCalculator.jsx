import React, {useState} from 'react';
import { Text, Platform, TouchableWithoutFeedback, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';

import * as yup from 'yup';

const validationSchema = yup.object().shape({
  mass: yup
    .number()
    .min(1, 'Weight must be greater or equal to 1')
    .required('Weight is required'),
  height: yup
    .number()
    .min(0.5, 'Height must be greater or equal to 0.5')
    .required('Height is required'),
});

const BodyMassIndexForm = ({ onSubmit }) => {
  const [massField, massMeta, massHelpers] = useField('mass');
  const [heightField, heightMeta, heightHelpers] = useField('height');

  return (
    <View>
<      FormikTextInput name="mass" placeholder="Weight (kg)" />
      <FormikTextInput name="height" placeholder="Height (m)" />
      <TouchableWithoutFeedback onPress={onSubmit}>
        <Text>Calculate</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const BodyMassIndexCalculator = () => {
  const [bmi, setBmi] = useState(null);

  const initialValues = {
    mass: '',
    height: '',
  };

  const getBodyMassIndex = (mass, height) => {
    return Math.round(mass / Math.pow(height, 2));
  };

  const onSubmit = (values) => {
    const mass = parseFloat(values.mass);
    const height = parseFloat(values.height);

    console.log('->', mass, height);


    if (!isNaN(mass) && !isNaN(height) && height !== 0) { 
      const bmi = getBodyMassIndex(mass, height);
      const val = `Your height is ${height} meters and mass ${mass} kg. Your body mass index is: ${bmi}`;
      setBmi(val);
    }
  };

  return (
    <View>
      <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <BodyMassIndexForm onSubmit={handleSubmit} />}
      </Formik>
      <Text>Your platform is: {Platform.OS}</Text>
      <Text>
        {bmi}
      </Text>
    </View>
  );
};

export default BodyMassIndexCalculator;