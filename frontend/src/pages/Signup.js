import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link } from "react-router-dom"

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [dateOfBirth, setdateOfBirth] = useState('')
    const [gender, setGender] = useState('')
    const {signup, error, isLoading} = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(name, email, username, password, dateOfBirth, gender)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Name: </label>
            <input 
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />
            <label>Email: </label>
            <input 
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label>Username: </label>
            <input 
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />
            <label>Password: </label>
            <input 
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <label>Date of Birth: </label>
            <input 
                type="date"
                onChange={(e) => setdateOfBirth(e.target.value)}
                value={dateOfBirth}
            />
            <label>Gender: </label>
            <input 
                type="text"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
            />

            <button disabled={isLoading}>Sign up</button>
            <div className="auth-redirect">
                <Link to='/login'>Already have an account? Login</Link>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup