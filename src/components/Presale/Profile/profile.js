import './profile.css';
import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { getUserData } from '../../../api';

function Profile() 
{
  const [userDetails, setUserDetails] = useState({});
  const userdata = useLocation();
  let userID = userdata.search.split('?post=');
  userID = userID[1];

  useEffect(async ()=> {
    const response = await getUserData({id: userID});
    setUserDetails(response.details);
    console.log('userDetails---', userDetails);
  }, []);

  return ( 
    <section className="welcome">
    <div className='container-login'>
      <div className="row">
        <div className="col-md-12 col-sm-6">
            <div className='container-login' id="container_demo" >
              <div id="wrapper">
                <div id="login-1" class="animate form">
                  {/* <img src={ logo } width="130" height="100%" alt="Logo" /> */}
                  <form  action="" className='col-md-12' autocomplete="on">
              <div className="form-group">
                <p>
                  <label>First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    value={userDetails?.name}
                    placeholder="first name"
                    title="enter your first name if any."
                  />
                </p>
              </div>
              
              <p>
                <div className="col-xs-6">
                  <label>Last name</label>
                  <input type="text" className="form-control" name="last_name" id="last_name" value={userDetails?.lastname} placeholder="last name" title="enter your last name if any." />
                </div>
              </p>
        
              <p>
                <div className="col-xs-6">
                  <label>Mobile</label>
                  <input type="text" className="form-control" name="mobile" id="mobile" value={userDetails?.phone} placeholder="enter phone" title="enter your phone number if any." />
                </div>
              </p>

              <p>
                <div className="col-xs-6">
                  <label>Email</label>
                  <input type="email" className="form-control" disabled name="email" id="email" value={userDetails?.email} placeholder="you@email.com" title="enter your email." />
                </div>
              </p>

              <p>
                <div className="col-xs-6">
                  <label>Location</label>
                  <input type="email" className="form-control" id="location" value={userDetails?.location} placeholder="somewhere" title="enter a location" />
                </div>
              </p>

              <div className="form-group">
                  <br />
                  <p class="signin button"> 
                    <input type="button" className="col-md-3" value="Update"/> 
                  </p>
                  {/* <button className="btn btn-lg btn-success" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button> */}
                  {/* <button class="btn btn-lg" type="reset"><i class="glyphicon glyphicon-repeat"></i> Reset</button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>  
      </div>  
    </div>  
    </section>
    );
}

export default Profile;