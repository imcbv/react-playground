import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, getOrCreateUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const defaultFormState = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormState);
  const { displayName, email, password, confirmPassword } = formFields;

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

    if (password !== confirmPassword) {
      // eslint-disable-next-line
      alert("Passowrds don't match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // eslint-disable-next-line
      alert('User succesfully created');
      resetFormFields();
      getOrCreateUserDocumentFromAuth(user, { displayName });
    } catch (e) {
      // eslint-disable-next-line
      alert(e.message);
    }
  };

  return (
    <div>
      <h1>Sign Up With Email Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="displayName">
          Name
          <input id="displayName" type="text" required onChange={handleChange} name="displayName" value={displayName} />
        </label>
        <label htmlFor="email">
          Email
          <input id="email" type="email" required onChange={handleChange} name="email" value={email} />
        </label>
        <label htmlFor="password">
          Password
          <input id="password" type="password" required onChange={handleChange} name="password" value={password} />
        </label>
        <label htmlFor="confirmPassword">
          Confirm Password
          <input id="confirmPassword" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
