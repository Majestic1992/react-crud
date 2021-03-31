import React, { useState, useEffect } from "react";
import EmployeeDataService from "../services/EmployeeDataService";

const Employee = (props) => {
  const initialEmployeeState = {
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    hireDate: new Date(),
    active: false,
  };

  const [currentEmployee, setCurrentEmployee] = useState(initialEmployeeState);
  const [message, setMessage] = useState("");

  const getEmployee = (id) => {
    EmployeeDataService.get(id)
      .then((response) => {
        setCurrentEmployee(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getEmployee(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentEmployee({ ...currentEmployee, [name]: value });
  };

  const updateActive = (status) => {
    var data = {
      id: currentEmployee.id,
      firstname: currentEmployee.firstname,
      lastname: currentEmployee.lastname,
      email: currentEmployee.email,
      telephone: currentEmployee.telephone,
      hireDate: currentEmployee.hireDate,
      active: status,
    };

    EmployeeDataService.update(currentEmployee.id, data)
      .then((response) => {
        setCurrentEmployee({ ...currentEmployee, active: status });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateEmployee = () => {
    EmployeeDataService.update(currentEmployee.id, currentEmployee)
      .then((response) => {
        console.log(response.data);
        setMessage("The employee was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteEmployee = () => {
    EmployeeDataService.remove(currentEmployee.id)
      .then((response) => {
        console.log(response.data);
        props.history.push("/employees");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentEmployee ? (
        <div className="edit-form">
          <h4>Employee</h4>
          <form>
            <div className="form-group">
              <label htmlFor="firstname">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstname"
                required
                value={currentEmployee.firstname}
                onChange={handleInputChange}
                name="firstname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                required
                value={currentEmployee.lastname}
                onChange={handleInputChange}
                name="lastname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={currentEmployee.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">Telephone</label>
              <input
                type="tel"
                className="form-control"
                id="telephone"
                required
                value={currentEmployee.telephone}
                onChange={handleInputChange}
                name="telephone"
              />
            </div>

            <div className="form-group">
              <label htmlFor="hireDate">Hire date</label>
              <input
                type="date"
                className="form-control"
                id="hireDate"
                required
                value={currentEmployee.hireDate}
                onChange={handleInputChange}
                name="hireDate"
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentEmployee.active ? "Active" : "Not active"}
            </div>
          </form>

          {currentEmployee.active ? (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateActive(false)}
            >
              Not active
            </button>
          ) : (
            <button
              className="badge badge-primary mr-2"
              onClick={() => updateActive(true)}
            >
              Active
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteEmployee}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateEmployee}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Employee...</p>
        </div>
      )}
    </div>
  );
};

export default Employee;
