import React, { useState } from "react";
import EmployeeDataService from "../services/EmployeeDataService";

const AddEmployee = () => {
  const initialEmployeeState = {
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    hireDate: new Date(),
    active: false,
  };
  const [employee, setEmployee] = useState(initialEmployeeState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: value });
  };

  const saveEmployee = () => {
    var data = {
      firstname: employee.firstname,
      lastname: employee.lastname,
      email: employee.email,
      telephone: employee.telephone,
      hireDate: employee.hireDate,
    };

    EmployeeDataService.create(data)
      .then((response) => {
        setEmployee({
          id: response.data.id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          telephone: response.data.telephone,
          hireDate: response.data.hireDate,
          active: response.data.active,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newEmployee = () => {
    setEmployee(initialEmployeeState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newEmployee}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="firstname">First name</label>
            <input
              type="text"
              className="form-control"
              id="firstname"
              required
              value={employee.firstname}
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
              value={employee.lastname}
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
              value={employee.email}
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
              value={employee.telephone}
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
              value={employee.hireDate}
              onChange={handleInputChange}
              name="hireDate"
            />
          </div>

          <button onClick={saveEmployee} className="btn btn-success mt-3">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddEmployee;
