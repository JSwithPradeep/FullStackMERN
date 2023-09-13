import React, { useContext, useEffect, useState } from "react";
import "./Register.css";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Select from "react-select";
import Spiner from '../../component/Spiner/Spiner';
import { useNavigate } from "react-router-dom";
import { registerfunc} from "../../services/Api";
import { ToastContainer,toast } from "react-toastify";


import 'react-toastify/dist/ReactToastify.css';
import { addData } from "../../component/context/Contexprovider";
const Register = () => {
  const [inputdata, setinputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const [showspin,setShowSpin] = useState(true);
 const navigate = useNavigate();

 const { useradd, setUseradd } = useContext(addData);

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

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(()=>{
      setShowSpin(false)
    },1200)
  },[image])


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
    }else if (image === ""){
      toast.error("Profile is Require !")
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
      data.append("user",image)
      data.append("location",location)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const response = await registerfunc(data,config);
    if (response.status === 200){
    setinputData({
  ...inputdata,
  fname: "",
  lname: "",
  email: "",
  mobile: "",
  gender: "",
  location: "",

});
setStatus("");
setImage("");
setUseradd(response.data)
navigate("/");

    }
    else{
      toast.error("Error!")
    }
    }
  }

  return (
    <>
    {
      showspin ? <Spiner/> :
      <div className="container">
        <h2 className="text-center mt-1">Register Your Details</h2>
        <Card className="shadow mt-3 p-3">
          <div className="profile_div text-center">
            <img src={preview ? preview : "/OIP.jfif"} alt="img" />
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
                  onChange={setInputValue}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="gender"
                  value={"Female"}
                  onChange={setInputValue}
                />
              </Form.Group>
              <Form.Group className="mb-3 col-lg-6">
                <Form.Label>Select Your Status</Form.Label>
                <Select options={option} onChange={setStatusValue}/>
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
        <ToastContainer position="top-right"/>
      </div>
    }
      
    </>
  );
};

export default Register;
