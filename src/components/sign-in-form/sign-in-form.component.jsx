import { useState } from "react";
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormState = {
    "email": '',
    "password": '',
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormState)
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const resetFormFields = () => {
        setFormFields(defaultFormState);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password)
            alert("You are now logged in");
            resetFormFields();
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <h1>Sign In With Email Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email} />

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password} />

                <button type="submit">Sign In</button>
            </form>
        </div>
    )
}

export default SignInForm