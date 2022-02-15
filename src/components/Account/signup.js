import './account.css';
import React, { useState } from 'react';

function Register()
{
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [emailid, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [msg, setMsg] = useState('');

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
    fetch('http://dgtlz.finance:5000/api/users/signup', requestOptions)
    .then(response => response.json())
    .then(data => {
      console.log('success', data);
      setMsg(data);
      setName('');
      setUserName('');
      setEmailId('');
      setPassword('');
      setCpassword('');
    });
  }

return (
  <section className="account">
    <div className='container'>
      <div className="row">
        <div className="col-md-6 offset-md-4">
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
              <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input"  id="exampleCheck1" />
                  <label className="form-check-label">Keep me signed in</label>
              </div>
              <label className="form-check-label">{msg ? msg: ''}</label>
              <button type="button" className="btn btn-warning btn-lg me-3" to='/account'>Login</button>
              <button type="button" className="btn btn-success btn-lg" onClick={() =>signup()}>Register</button>
            </form>
        </div>
      </div>
    </div>
</section>
)
}

export default Register;