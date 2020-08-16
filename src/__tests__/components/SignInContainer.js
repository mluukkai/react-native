import React from 'react';
import { render, fireEvent, act, waitFor } from '@testing-library/react-native';
import SigninContainer from '../../components/SigninContainer';

describe('Signin', () => {
  describe('SigninContainer', () => {
    it('renders repository information correctly', async () => {
      const onSubmit = jest.fn();
      const { getByTestId } = render(<SigninContainer onSubmit={onSubmit} />);
      
      await act(async() => {
        fireEvent.changeText(getByTestId('usernameField'), 'kalle');
      });

      await act(async() => {
        fireEvent.changeText(getByTestId('passwordField'), 'password');  
      });  

      await act(async() => {
        fireEvent.press(getByTestId('signinButton'));
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);
  
      // onSubmit.mock.calls[0][0] contains the first argument of the first call
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: 'kalle',
        password: 'password',
      });
    });
  });
});