import './dashboard.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import envelope from '../../images/neve-envelope-1.png';
import loading from '../../images/loading.gif';
import { getUserData } from '../../api';

function Dashboard() {
  const [userDetails, setUserDetails] = useState({});
  const [isLoader, setIsLoader] = useState('true');

  const userdata = useLocation();
  const navigate = useNavigate(); 
  let userID = userdata.search.split('?post=');
  userID = userID[1];
  
  useEffect(async ()=> {
    const response = await getUserData({id: userID});
    setUserDetails(response.details);
    setIsLoader('false');
  }, []);
  
  console.log('getUserData ---', userDetails);
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
    <section className="hasBgShadow mt-4 safeTools">
      <div className='container-login'>
        <div className="row">
          <div className="col-md-3 col-sm-6 col-xs-6 offset-md-2 animate__animated animate__fadeInUp">
            <div className="safeBlock dash-info mb-5 text-center bg-white border-bottom border-danger border-4 p-5 rounded-3">
          {
            isLoader == 'true' ? 
            <>
              <img src={loading} alt="" className="img-fluid loading-load" />
            </>
            :
            <>
              <img src={envelope} alt="" className="img-fluid env" />
              <h5 className="fw-bold my-4">User Info</h5>
              <p><i class="fa fa-user p-1" aria-hidden="true"></i> {userDetails?.username}</p>
              <p><i class="fa fa-envelope-open p-1" aria-hidden="true"></i> {userDetails?.email}</p>
              <p><i class="fa fa-location-arrow p-1" aria-hidden="true"></i> {userDetails?.location ? userDetails?.location : 'xxxxxxx'} </p>
              <p><i class="fa fa-phone p-1" aria-hidden="true"></i> {userDetails?.phone ? userDetails.phone : 'xxxxxxxx'}</p>
            </>
          }
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6 animate__animated animate__fadeInUp">
            <div className="safeBlock dash-info mb-5 text-center bg-white border-bottom border-danger border-4 p-5 rounded-3">
            {
              isLoader == 'true' ? 
              <>
                <img src={loading} alt="" className="img-fluid loading-load" />
              </>
              :
              <>
                <img src={envelope} alt="" className="img-fluid env" />
                <h5 className="fw-bold my-4">Plan Details</h5>
                <p>Plan Name: The Wise</p>
                <p>Cost: $5/month</p>
                <p>5% Minimum Return</p>
                <p>$100 Management Fees</p>
                </>
            }
            </div>
          </div>
          <div className="col-md-3 col-sm-6 col-xs-6 animate__animated animate__fadeInUp">
            <div className="safeBlock dash-info mb-5 text-center bg-white border-bottom border-danger border-4 p-5 rounded-3">
            {
              isLoader == 'true' ? 
              <>
                <img src={loading} alt="" className="img-fluid loading-load" />
              </>
            :
              <>
                <img src={envelope} alt="" className="img-fluid env" />
                <h5 className="fw-bold my-4">KYC Details</h5>
                <p>KYC Name: {userDetails?.docName}</p>
                <p>KYC Type: {userDetails?.docType}</p>
                <p>Status: {userDetails?.iskyc ? 'Verified' : 'Pending'}</p>
                <hr />
                <p class="signin button"> 
                  <input type="button" className='btn-primary' onClick={() => routeChange('/kyc')} value="Update"/> 
                </p>
              </>
            }
            </div>
          </div>
        </div>
      </div>
    </section>
    );
}

export default Dashboard;