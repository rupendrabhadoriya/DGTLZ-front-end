import React from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

const Plan = () => {
  
  const userdata = useLocation();
  const navigate = useNavigate(); 
  
  let userID = userdata.search.split('?post=');
  userID = userID[1];

  const routeChange = (url, data) =>{ 
    let path = url;
    let postData = userID ? userID : data?.details?._id;
    if (userID == undefined) {
      navigate({pathname: path, state: data});
    } else {
      navigate({pathname: path, state: data, search: `?post=${postData}`});
    }
  }


  return (
    <section className='welcome'>
      <div className="container bootstrap snippet">
        <div className="row"> 
          <div className="col-sm-10 col-md-12">
            <div className="row"> 
            <div className="col-sm-10">
              <h1>Kyc Details</h1>
              <p></p>
              <h3 className='info-msg form-label fs-5'>And if you already updated the KYC please wait upto 24hour to make it work</h3>
              <h3 className='info-msg form-label fs-5'>
                If not Update your KYC first to see the Plan Details
                <p class="signin button"> 
                  <input type="button" className='btn-primary' onClick={() => routeChange('/kyc')} value="Update"/> 
                </p>
              </h3>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
  }
  
  export default Plan;