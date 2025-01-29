import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../styles/register.css';

function Register() {
  const navigate = useNavigate();

  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/users/register', info, { withCredentials: false });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register">
      <Navbar />
      <div className="registerCard">
        <div className="center">
          <h1>Join Us</h1>
          <form>
            <div className="formInput">
              <div className="txt_field">
                <input
                  type="text"
                  id="username"
                  //   placeholder="username"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="username">Username</label>
              </div>
              <div className="txt_field">
                <input
                  type="email"
                  id="email"
                  //   placeholder="email"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="txt_field">
                <input
                  type="password"
                  id="password"
                  //   placeholder="tape your password here"
                  required
                  onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="login_button">
              <button className="button" onClick={handleClick}>
                Register
              </button>
            </div>
            <div className="signup_link">
              <p>
                Already have an account?
                <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
