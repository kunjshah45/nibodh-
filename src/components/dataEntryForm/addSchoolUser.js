import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import useForm from 'react-hook-form';
import SchoolService from '../../services/school';

function AddSchoolUser(props) {

    const { register, handleSubmit, errors } = useForm();

    const onSubmitSchoolUser = async (item) => {
        console.log("onSubmitSchoolUser : : :", item);

        let response = await SchoolService.addSchoolUser(item);
        console.log("response", response);
        // props.history.push("/jobs/activeJobs")

    }

    const registerAsData = [
        { name: "Principal", value: "principal" },
        { name: "Managment", value: "managment" },
        { name: "Ex Student", value: "ex-student" },
        { name: "Teacher", value: "teacher" },
        { name: "Student", value: "student" },
        { name: "Other", value: "other" }
    ]
    // fetch utils
    return (
        <div className="container">
            <div className="card" >
                <div className="card-header ml-3">
                    <h5>Add School User</h5>
                </div>
                <form className="form mx-3 my-3" onSubmit={handleSubmit(onSubmitSchoolUser)}>

                    <div className='row my-2'>
                        <div className='col-12'>
                            <div className="form-group">
                                <label for="schoolName">School Name</label>
                                <input type="text" className="form-control" name="schoolName" id="schoolName" aria-describedby="schoolName" placeholder="Enter School Email" ref={register} required />
                            </div>
                        </div>
                    </div>

                    <div className='col'>
                        <div className='row'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label for="schoolEmail">School Email</label>
                                    <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control" name="schoolEmail" id="schoolEmail" placeholder="School Email" required ref={register} />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label for="password">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" placeholder="Password" required ref={register} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="pincode">Pincode</label>
                                <input type="number" className="form-control" name="pincode" id="pincode" placeholder="Pincode" required ref={register} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="registerAs">Register As</label>
                                <select id="registerAs" name="registerAs" className="form-control" ref={register({ validate: value => value != '' })} ref={register} required>
                                    <option value="">--Select--</option>
                                    {registerAsData.map((items, index) => {
                                        return (
                                            <option value={items.value} key={items.value}>{items.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-4'>
                            <div className="form-group">
                                <label for="firstName">First Name</label>
                                <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name" required ref={register} />
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label for="middleName">Middle Name</label>
                                <input type="text" className="form-control" name="middleName" id="middleName" placeholder="Middle Name" ref={register} />
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className="form-group">
                                <label for="lastName">Last Name</label>
                                <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Last Name" required ref={register} />
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="personalPhone">Personal Phone</label>
                                <input type="tel" pattern="[6789][0-9]{9}" className="form-control" name="personalPhone" id="personalPhone" placeholder="Personal Phone" required ref={register} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="personalEmail">Personal Email</label>
                                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control" name="personalEmail" id="personalEmail" placeholder="Personal Email" required ref={register} />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </div>
    );
}

export default AddSchoolUser;