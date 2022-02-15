import './account.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


function Account()
{
    const [userEname, setUserEname] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate(); 
    const routeChange = (url) =>{ 
        let path = url; 
        navigate(path);
    }


    const login = () => {
        console.log('login....');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: userEname,
                password: password,
            })
        };
        fetch('http://dgtlz.finance:5000/api/users/login', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log('success', data);
                routeChange('/welcome');
            });
    }

    const responseFacebook = (response) => {
        console.log('%%%%%%%%%%%%%%%%%', response);
        if (response.status !== "unknown") {
            routeChange('/welcome');
        }
    }
    
    const responseGoogle = (response) => {
        console.log('*********************', response);
        if (!response.error) {
            routeChange('/welcome');
        }
    }


    return (
        <section className="account">
            <div className='container'>
                <div className="row">
                    <div className="col-md-6 offset-md-4">
                        <form method='post' action=''>
                            <div className="mb-3">
                                <label className="form-label fs-5">Username or E-mail</label>
                                <input type="email" className="form-control p-3" value={userEname} onChange={(e)=> setUserEname(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label fs-5">Password</label>
                                <input type="password" className="form-control p-3" value={password} onChange={(e)=> setPassword(e.target.value)} />
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
                    <div className="col-md-3 offset-md-4">
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