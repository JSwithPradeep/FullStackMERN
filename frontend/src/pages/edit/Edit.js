import  React, { useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Spiner from '../../component/Spiner/Spiner';
import { singleUsergetfunc, editfunc} from "../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import { updateData } from "../../component/context/Contexprovider";
import 'react-toastify/dist/ReactToastify.css';
import "./Edit.css"
import { BASE_URL } from "../../services/Helper";


const Edit = () => {

  const [inputdata, setinputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [imgdata, setImageadata] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const {update, setUpdate} = useContext(updateData)
 
  const navigate = useNavigate();

  const [showspin,setShowSpin] = useState(true)
  const {id} = useParams();
 
  const option = [
    { value: "Active", label: "Active" },
    { value: "InActive", label: "InActive" },
  ];

  //SETINPUT value

  const setInputValue = (e) => {
    const { name, value } = e.target;
    setinputData({ ...inputdata, [name]: value });
  };

  const setStatusValue = (e)=>{
    setStatus(e.value)
  }

  const setProfile = (e) =>{
    setImage(e.target.files[0])
  }

  

  const userprofileGet = async()=>{
    const respone = await singleUsergetfunc(id);
    
    if(respone.status === 200){
      
      setinputData(respone.data)
      setStatus(respone.data.status)
      setImageadata(respone.data.profile)
    }else{
      console.log("error")
    }

  }
  


  //submit user data
   const submitUserData = async(e) =>{
    e.preventDefault();
    const {fname, lname, email, mobile, gender, location} = inputdata;

    if(fname === ""){
      toast.error("Fname is Require !")
    } else if(lname === ""){
      toast.error("lname is Require !")
    }else if(email === ""){
      toast.error("Email is Require !")
    }else if(!email.includes("@")){
      toast.error("Enter valid Email")
    }else if(mobile == ""){
      toast.error("Mobile No is require")
    }else if(mobile.length >10){
      toast.error("Enter valid Mobile No")
    }else if (mobile.length <10){
      toast.error("Enter valid mobile No")
    }else if (gender === ""){
      toast.error("Gender is require")
    }else if (status === ""){
      toast.error("status is Require !")
    }else if (location === ""){
      toast.error("loaction is Require !")
    } else {
      let data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user",image || imgdata)
      data.append("location",location)

      const config = {
        "Content-Type":"multipart/form-data"
      }
      const response = await editfunc(id, data, config)
      
      if(response.status === 200){
       setUpdate(response.data)
          navigate("/")
      }
    }
   }

   useEffect(()=>{
    userprofileGet()
   },[id])
   useEffect(() => {
    if (image) {
      setImageadata("")
      setPreview(URL.createObjectURL(image))
    }
   
    
    setTimeout(()=>{
      setShowSpin(false)
    },1200)
    
  },[image])
   
  return (
   <>
   {
    showspin ? <Spiner/> :
    <div className="container">
    <h2 className="text-center mt-1">Edit Your Profile</h2>
    <Card className="shadow mt-3 p-3">
      <div className="profile_div text-center">
        <img src={image ? preview :`${BASE_URL}/uploads/${imgdata}`} alt="img" />
      </div>
      <Form>
        <Row>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text" 
              name="fname"
              value ={inputdata.fname}
              onChange={setInputValue}
              placeholder="Enter Your First Name"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lname"
              value ={inputdata.lname}
              onChange={setInputValue}
              placeholder="Enter Your Last Name"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value ={inputdata.email}
              onChange={setInputValue}
              placeholder="Enter Your Email"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              name="mobile"
              value ={inputdata.mobile}
              onChange={setInputValue}
              placeholder="Enter Your Mobile No"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Select Your Gender</Form.Label>
            <Form.Check
              type={"radio"}
              label={`Male`}
              name="gender"
              value={"Male"}
              checked={inputdata.gender == "Male" ? true:false}
              onChange={setInputValue}
            />
            <Form.Check
              type={"radio"}
              label={`Female`}
              name="gender"
              value={"Female"}
              checked={inputdata.gender == "Female" ? true:false}
              onChange={setInputValue}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Select Your Status</Form.Label>
            <Select options={option} defaultValue={status} onChange={setStatusValue}/>
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Select Your Profile</Form.Label>
            <Form.Control
              type="file"
              onChange={setProfile}
              name="user"
            />
          </Form.Group>
          <Form.Group className="mb-3 col-lg-6">
            <Form.Label>Enter Your Location</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={inputdata.location}
              onChange={setInputValue}
              placeholder="Select Your location"
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={submitUserData}>
            Submit
          </Button>
        </Row>
      </Form>
    </Card>
    <ToastContainer
    position="top-right"
/>
  </div>
   }
  
   </>
  )
}

export default Edit