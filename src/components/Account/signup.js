import './account.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { config } from '../../config.js';


function Register()
{
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [msg, setMsg] = useState('');
  
  let navigate = useNavigate(); 
  const routeChange = (url) =>{ 
      let path = url; 
      navigate(path);
  }

  const responseFacebook = (response) => {
    console.log('%%%%%%%%%%%%%%%%%', response);
    if (response.status !== "unknown") {
        routeChange('/profile', response);
    }
  }

  const responseGoogle = (response) => {
    console.log('*********************', response);
    if (!response.error) {
        routeChange('/profile', response);
    }
  }


  const signup = () => 
  {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        username: username,
        email: emailid,
        password: password,
        confirmPassword: cpassword,
      })
    };
    fetch(`${config.apiurl}/users/signup`, requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('success', data);
      // setMsg(data);
      setName('');
      setUserName('');
      setEmailId('');
      setPassword('');
      setCpassword('');
      routeChange('/profile');
    });
  }

return (
  <section className='welcome welcome-singup'>
    <div className=''>
      <div className="row">
        <div className="col-md-6 offset-md-2">
          <form method='post' action=''>
              <div className="mb-3">
                  <label className="form-label fs-5">Name</label>
                  <input type="text" className="form-control p-3" value={name} onChange={(e)=> setName(e.target.value)} />
              </div>
              <div className="mb-3">
                  <label className="form-label fs-5">Username</label>
                  <input type="text" className="form-control p-3" value={username} onChange={(e)=> setUserName(e.target.value)} />
              </div>
              <div className="mb-3">
                  <label className="form-label fs-5">Email</label>
                  <input type="email" className="form-control p-3" value={emailid} onChange={(e)=> setEmailId(e.target.value)} />
              </div>
              <div className="mb-3">
                  <label className="form-label fs-5">Password</label>
                  <input type="password" className="form-control p-3" value={password} onChange={(e)=> setPassword(e.target.value)} />
              </div>
              <div className="mb-3">
                  <label className="form-label fs-5">Confirm Password</label>
                  <input type="password" className="form-control p-3" value={cpassword} onChange={(e)=> setCpassword(e.target.value)} />
              </div>
              {/* <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input"  id="exampleCheck1" />
                  <label className="form-check-label">Keep me signed in</label>
              </div> */}
              <label className="form-check-label">{msg ? msg: ''}</label>
              <button type="button" className="btn btn-warning btn-lg me-3" onClick={() =>routeChange('/login')}>Login</button>
              <button type="button" className="btn btn-success btn-lg" onClick={() =>signup()}>Register</button>
            </form>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-md-3 offset-md-2">
          <FacebookLogin appId="444022854132394" autoLoad={false} fields="name,email,picture" callback={responseFacebook} 
          cssClass="my-facebook-button-class" icon="fa-facebook-square" />
        </div>
        <div className="col-md-3">
          <GoogleLogin
              clientId="308643233981-meuh47926i4dioobe2tffvccmqtotkg6.apps.googleusercontent.com"
              buttonText="Login WIth Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
</section>
)
}

export default Register;