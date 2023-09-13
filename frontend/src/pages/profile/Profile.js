import React, { useEffect, useState } from 'react';
import "./Profile.css"; 
import {Card, Row} from 'react-bootstrap';
import Spiner from '../../component/Spiner/Spiner';
import { useParams } from 'react-router-dom';
import { singleUsergetfunc } from '../../services/Api';
import { BASE_URL } from '../../services/Helper';
import moment from "moment";
const Profile = () => {
 
  const  [userProfile, setUserProfile] = useState({})
  const [showspin,setShowSpin] = useState(true);

  const {id} = useParams();

  const userprofileGet = async()=>{
    const respone = await singleUsergetfunc(id);
    
    if(respone.status === 200){
      setUserProfile(respone.data)
    }else{
      console.log("error")
    }

  }

  useEffect(()=>{
    userprofileGet();
    setTimeout(()=>{
      setShowSpin(false)
    },1200)
   },[])

  return (
   <>
   {
    showspin ? <Spiner/> :
    <div className='container'>
    <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
    <Card.Body>
      <Row>
        <div className='col'>
          <div className='card-profile-status d-flex justify-content-center'>
            <img src= {`${BASE_URL}/uploads/${userProfile.profile}`} alt=''/>
          </div>
        </div>
      </Row>
      <div className='text-center'>
        <h3>{userProfile.fname + userProfile.lname}</h3>
        <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:-<span>{userProfile.email}</span></h4>
        <h5><i class="fa-solid fa-mobile"></i>&nbsp;:-<span>{userProfile.mobile}</span></h5>
        <h4><i class="fa-solid fa-person"></i>&nbsp;:-<span>{userProfile.gender}</span></h4>
        <h4><i class="fa-solid fa-location-dot location"></i>&nbsp;:-<span>{userProfile.location}</span></h4>
        <h4>Status&nbsp;:-<span>{userProfile.status}</span></h4>
        <h5><i class="fa-solid fa-calendar-days celender"></i>&nbsp;Date Created&nbsp;:-<span>{moment(userProfile.datecreated).format("DD-MM-YYYY")}</span></h5>
        <h5><i class="fa-solid fa-calendar-days celender"></i>&nbsp;Date Updated&nbsp;:-<span>{userProfile.updated}</span></h5>
      </div>
    </Card.Body>
    </Card>
   </div>
   }
 
   </>
  )
}

export default Profile