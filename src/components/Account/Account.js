import './account.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { getLogin } from '../../api';
import { minMaxLength, validEmail} from './validator';

function Account()
{
    const [userEname, setUserEname] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    let navigate = useNavigate(); 
    const routeChange = (url, data) =>{ 
        let path = url; 
        navigate({pathname: path, state: data, search: `?post=${data?.details?._id}`});
    }

    const login = async () => {

      const validEMail = validEmail(userEname);
      const validLen = minMaxLength(userEname, 1)
      const validPwdLen = minMaxLength(password, 1)

      console.log('validEMail---', validEMail);
      if (validLen && validPwdLen) {
        setMsg('Please fill required fields');
      }
      else if (validEMail) {
        const requestOptions = {
          body: JSON.stringify({
            username: userEname,
            password: password,
          })
        };

        const getData = await getLogin(requestOptions);
        console.log('getData', getData);
        
        if (getData?.success === 'success') routeChange('/profile', getData); 
            setMsg('Invalid EamilId or Password');

      } else {
        setMsg('Invalid EmailId');
      }
    }

    const responseFacebook = (response) => {
        if (response.status !== "unknown") {
            routeChange('/profile', response);
        }
    }
    
    const responseGoogle = (response) => {
        if (!response.error) {
            routeChange('/profile', response);
        }
    }


    return (
      <section className="welcome">
        <div className='container-login'>
          <div className="row">
            <div className="col-md-6 col-sm-6 offset-md-2">
              <form method='post' action=''>
                <h3 className='error-msg form-label fs-5'>{msg ? msg : '' }</h3>
                <div className="mb-3">
                  <label className="form-label fs-5">E-mail <span className='error-msg'>*</span></label>
                  <input
                    type="email" 
                    className="form-control p-3" 
                    value={userEname} 
                    onChange={(e)=> setUserEname(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fs-5">Password <span className='error-msg'>*</span></label>
                  <input
                    type="password"
                    className="form-control p-3"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                  />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input"  id="exampleCheck1" />
                    <label className="form-check-label">Keep me signed in</label>
                </div> */}
                <button type="button" className="btn btn-warning btn-lg me-3" onClick={() =>login()}>Login</button>
                <button type="button" className="btn btn-success btn-lg" onClick={()=> routeChange('/signup')}>Register</button>
              </form>
            </div>
          </div>
        </div>
        <div className='container'>
          <hr />
          <div className="row">
            <div className="col-md-3 col-sm-6 offset-md-2">
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
    );
}

export default Account;