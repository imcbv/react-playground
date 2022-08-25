import { useState } from "react";
import { createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import { createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormState = {
    "displayName": '',
    "email": '',
    "password": '',
    "confirmPassword": ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormState)
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setFormFields({
            ...formFields,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passowrds don't match")
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            createUserDocumentFromAuth(user, { displayName })
            setFormFields(defaultFormState);
        } catch (e) {
            alert(e.message)
        }

    }

    return (
        <div>
            <h1>Sign Up Form</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input type="text" required onChange={handleChange} name="displayName" value={displayName} />

                <label>Email</label>
                <input type="email" required onChange={handleChange} name="email" value={email} />

                <label>Password</label>
                <input type="password" required onChange={handleChange} name="password" value={password} />

                <label>Confirm Password</label>
                <input type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpForm