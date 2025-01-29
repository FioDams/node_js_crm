import { useContext, useState } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../authContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css';

function Login() {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const res = await axios.post('users/login', credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        // If error response and data exist,
        // dispatch LOGIN_FAILURE with error message
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'An error occurred while logging in',
        });
      }
    }
  };

  return (
    <div className="login">
      <Navbar />
      <div className="loginCard">
        <div className="center">
          <h1>Welcome Back!</h1>
          <form>
            <div className="txt_field">
              <input
                type="text"
                id="username"
                // placeholder="username"
                required
                onChange={handleChange}
                className="lInput"
              />
              <label htmlFor="username">Username</label>
            </div>
            <div className="txt_field">
              <input
                type="password"
                id="password"
                // placeholder="username"
                required
                onChange={handleChange}
                className="lInput"
              />
              <label htmlFor="password">Password</label>
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Login
              </button>
            </div>
            <div className="signup_link">
              <p>
                Not registered?&nbsp;
                <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
