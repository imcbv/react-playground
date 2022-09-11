import React, { useState } from 'react';
import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const defaultFormState = {
  email: '',
  password: ''
};

function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormState);
  const { email, password } = formFields;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormFields({
      ...formFields,
      [name]: value
    });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      // eslint-disable-next-line
      alert('You are now logged in');

      resetFormFields();
    } catch (error) {
      // eslint-disable-next-line
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sign In With Email Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input id="email" type="email" required onChange={handleChange} name="email" value={email} />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password" required onChange={handleChange} name="password" value={password} />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
