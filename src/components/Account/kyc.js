import './account.css';
import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import FileBase64 from 'react-file-base64';
import { kycUpdate } from '../../api';


function Kyc()
{
  const userdata = useLocation();
  let userID = userdata.search.split('?post=');
  userID = userID[1];
  const [item, setItem] = useState({id: userID, docName: '', docType: '', image: '' });
  const [msg, setMsg] = useState('');

  const uploadImage = async () => {
    // console.log('item list ', item);
    const result = await kycUpdate(item);

    console.log('image upload----', result);

    if(result?.success == 'sucsess') {
      setMsg('Kyc Updated');
    } else {
      setMsg('Please try again later');
    }
  }

  return (
    <section className='welcome'>
      <div className="container bootstrap snippet">
        <div className="row"> 
          <div className="col-sm-10">
            <h1>Kyc Details</h1>
            <h3 className='error-msg form-label fs-5'>{msg ? msg : '' }</h3>
          </div>
        </div>
        <div className="row"> <div className="col-sm-9">
          <div className="tab-pane active"> <hr />
            <form className="form" id="registrationForm">
              <div className="form-group">
                <div className="col-xs-6">
                  <label><h4>Document name</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    name="doc_name"
                    id="doc_name"
                    placeholder="Enter Document Name"
                    title="Document Name."
                    onChange={e => setItem({ ...item, docName: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <div className="col-xs-6">
                  <label><h4>Documnet Type</h4></label>
                  <input
                    type="text"
                    className="form-control"
                    name="doc_type"
                    id="doc_type"
                    placeholder="Enter Document Type"
                    title="Document Type."
                    onChange={e => setItem({ ...item, docType: e.target.value })}
                  />
                </div>
              </div>
        
              <div className="form-group">
                <div className="col-xs-6">
                  <label><h4>Upload</h4></label>
                  <FileBase64
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) => setItem({ ...item, image: base64 })}
                  />
                  {/* <input type="file" className="form-control" name="file" id="file" /> */}
                </div>
              </div>

              <div className="form-group">
                <p class="signin button"> 
                  <input type="button" className="col-md-3" onClick={()=> uploadImage()} value="Update"/> 
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>  
    </section>
  );

}


export default Kyc;