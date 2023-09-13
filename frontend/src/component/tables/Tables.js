import React from "react";
import "./table.css";
import { Badge, Card, Row, Table } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { BASE_URL } from "../../services/Helper";
import { NavLink } from "react-router-dom";
import { statusChangefunc } from "../../services/Api";
import Paginations from "../pagination/Pagination";
import { ToastContainer, toast } from "react-toastify";

function Tables({
  userdata,
  deleteUser,
  userGate,
  handlePre,
  handleNext,
  page,
  pageCount,
  setPage
}) {
  const handleChange = async (id, status) => {
    const response = await statusChangefunc(id, status);
    if (response.status === 200) {
      userGate();
      toast.success("Status Updated");
    } else {
      toast.error("error");
    }
  };

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-0">
            <Card className="shadow">
              <Table className="align-items-center" responsive="sm">
              <thead className='thead-dark'>
                  <tr className='table-dark'>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>

                {userdata?.length > 0 ? (
                  userdata.map((element, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index + 1 + (page - 1) * 4}</td>
                          <td>{element.fname + element.lname}</td>
                          <td>{element.email}</td>
                          <td>{element.gender}</td>
                          <td className="d-flex align-items-center">
                            <Dropdown className="text-center">
                              <Dropdown.Toggle
                                className="dropdown_btn"
                                id="dropdown-basic"
                              >
                                <Badge
                                  bg={
                                    element.status == "Active"
                                      ? "primary"
                                      : "danger"
                                  }
                                >
                                  {element.status}
                                  <i class="fa-solid fa-angle-down"></i>
                                </Badge>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "Active")
                                  }
                                >
                                  Active
                                </Dropdown.Item>
                                <Dropdown.Item
                                  onClick={() =>
                                    handleChange(element._id, "InActive")
                                  }
                                >
                                  InActive
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                          <td className="img_parent">
                            <img
                              src={`${BASE_URL}/uploads/${element.profile}`}
                              alt="img"
                            />
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle
                                variant="light"
                                className="action"
                                id="dropdown-basic"
                              >
                                <i class="fa-solid fa-ellipsis-vertical"></i>
                              </Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item>
                                  <NavLink
                                    to={`/profile/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      class="fa-solid fa-eye"
                                      style={{ color: "green" }}
                                    ></i>{" "}
                                    <span>View</span>
                                  </NavLink>
                                </Dropdown.Item>

                                <Dropdown.Item>
                                  <NavLink
                                    to={`/edit/${element._id}`}
                                    className="text-decoration-none"
                                  >
                                    <i
                                      class="fa-solid fa-pen-to-square"
                                      style={{ color: "blue" }}
                                    ></i>
                                    <span>Edit</span>
                                  </NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div onClick={() => deleteUser(element._id)}>
                                    <i
                                      class="fa-solid fa-trash"
                                      style={{ color: "red" }}
                                    ></i>
                                    <span>Delete</span>
                                  </div>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      </>
                    );
                  })
                ) : (
                  <div className="no__data text-align-center"></div>
                )}
              </Table>
              <Paginations
                handlePre={handlePre}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
              />
            </Card>
          </div>
        </Row>
        <ToastContainer />
      </div>
    </>
  );
}

export default Tables;
