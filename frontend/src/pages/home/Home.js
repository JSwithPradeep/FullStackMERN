import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../component/tables/Tables';
import Spinner from 'react-bootstrap/Spinner';
import { addData, dltData, updateData, } from '../../component/context/Contexprovider';
import { userGetFunc,deletefunc,exporttocsvfun } from '../../services/Api';
import Alert from 'react-bootstrap/Alert';
import Spiner from '../../component/Spiner/Spiner';
import { useNavigate } from 'react-router-dom';

import "./Home.css"
import { toast } from 'react-toastify';


const Home = () => {


  const [userdata,setUserdata] = useState([]);
  const [showspin,setShowSpin] = useState(true)
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

const {useradd, setUseradd} = useContext(addData);
const {update, setUpdate} = useContext(updateData);
const {deletedata, setDeletedata} = useContext(dltData);

  const navigate = useNavigate();


  const adduser =()=>{
    navigate("/register")
  }
  
  //get user
  const userGate = async()=>{
  const response = await userGetFunc(search,gender,status,sort,page);
 
  if(response.status === 200){
    setUserdata(response.data.usersData)
    setPageCount(response.data.Pagination.pageCount)
  }else{
    console.log("error for get userData")
  }
}


//delte user
const deleteUser = async(id)=>{
  const respone = await deletefunc(id);
  if(respone.status === 200){
    userGate();
    setDeletedata(respone.data)
  }else{
    toast.error("error")
  }
}

//export user
const exportsuser = async()=>{
  const response = await exporttocsvfun();
  if (response.status === 200){
    window.open(response.data.downloadUrl, "blank")
  }else{
    toast.error("Error !")
  }
}

//pagination
//handleprebtn
const handlePre = () =>
{
  setPage(()=>{
    if(page === 1) return page;
    return page - 1 
  })
}


//handleNextbtn.
const handleNext = ()=>{
  setPage(()=>{
    if(page === pageCount) return page;
    return page + 1
  })
}

useEffect(()=>{
  userGate();
  setTimeout(()=>{
    setShowSpin(false)
  },1200)
 },[search,gender,status,sort,page])
  
 return (
    <>
     {
      useradd ?  <Alert variant="success" onClose={() => setUseradd("")} dismissible>{useradd.fname.toUpperCase()} Succesfully Added</Alert>:""
    }

    {
      update ?<Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Succesfully Update</Alert>:""
    }
    {
    deletedata?<Alert variant="danger" onClose={() => setDeletedata("")} dismissible>{deletedata.fname.toUpperCase()} Succesfully Deleted</Alert>:""
    }

    <div className='container'>
      <div className='main_div'>
        <div className='search_add mt-4 d-flex justify-content-between '>
          <div className='search col-lg-4 col-md-6 col-sm-6  col-6'>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e)=>setSearch(e.target.value)}
            />
            <Button variant="success" className='search_btn'>Search</Button>
          </Form>
          </div>
            <div className='add_btn'>
            <Button variant="primary" className='search_btn' onClick={adduser}><i class="fa-solid fa-plus"></i>&nbsp;Add User</Button>
            </div>
        </div>
        {/* export ,gender,status */}
        <div className='filter_div mt-5 d-flex justify-content-between flex-wrap col-lg-12 col-md-10 col-sm-10 col-12'>
          <div className='export_csv'>
          <Button className='export_csv' onClick={exportsuser}>Export To Csv</Button>
          </div>
          <div className='filter_gender'>
            <h3>Filter By Gender</h3>
            <div className='gender d-flex justify-content-around'>
                 <Form.Check
                  type={"radio"}
                  label={`All`}
                  name="status"
                  value={"All"}
                  onChange={(e)=>setGender(e.target.value)}
                 defaultChecked
                />
                <Form.Check
                  type={"radio"}
                  label={`Male`}
                  name="status"
                  value={"Male"}
                  onChange={(e)=>setGender(e.target.value)}
                />
                <Form.Check
                  type={"radio"}
                  label={`Female`}
                  name="status"
                  value={"Female"}
                  onChange={(e)=>setGender(e.target.value)}
                />
                
            </div>
          </div>
        
        {/* sort by value */}
        <div className='filter_newold'>
          <h3>Short by value</h3>
          <Dropdown className='text-center'>
      <Dropdown.Toggle className='drowdown_btn' id='dropdown-basic'>
      <i class="fa-solid fa-sort"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={()=>setSort("new")} >New</Dropdown.Item>
        <Dropdown.Item onClick={()=>setSort("old")}>Old</Dropdown.Item>
      
      </Dropdown.Menu>
    </Dropdown>
        </div>


      {/* filter by status */}
      <div className='filter_status'>
        <div className='status'>
          <h3>Filter By Status</h3>
          <div className='status_radio d-flex justify-content-around flex-wrap'>
          <Form.Check
                  type={"radio"}
                  label={`All`}
                  name="gender"
                  value={"All"}
                  onChange={(e)=>setStatus(e.target.value)}
                 defaultChecked
                />
                <Form.Check
                  type={"radio"}
                  label={`Active`}
                  name="gender"
                  value={"Active"}
                  onChange={(e)=>setStatus(e.target.value)}
                />
                <Form.Check
                  type={"radio"}
                  label={`InActive`}
                  name="gender"
                  value={"InActive"}
                  onChange={(e)=>setStatus(e.target.value)}
                />
          </div>
        </div>
      </div>
    </div>
  </div>
  {
   showspin ? <Spiner/>: <Tables
   userdata={userdata}
   deleteUser = {deleteUser}
   userGate  = { userGate }
   handlePre = { handlePre}
   handleNext = {handleNext}
   page = {page}
   pageCount = {pageCount}
   setPage = {setPage}
    />
 
  }
  
    </div>
    </>
  )
}

export default Home