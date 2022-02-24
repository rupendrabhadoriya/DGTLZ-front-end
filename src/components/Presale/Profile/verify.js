import './profile.css';
// import { useState } from 'react';
import {useLocation} from 'react-router-dom';

function Verify() {
  const userdata = useLocation();
  const userDetails = userdata.state;

  return ( 
    <section className='welcome'>
      <div className="col-md-6">
        <div className="block text-center">
          <h1 className="py-5 fw-bold">Email verified </h1>
          <div className="py-2 fw-bold">
                <a href="http://dgtlz.finance/login" target='_blank'>
                  <h4 className='text-blue'>Click to Login DGTLZ Finance</h4>
                </a>
              </div>
        </div>
      </div>
    </section>
  )
}

export default Verify;