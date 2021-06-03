import React, { useState, useEffect } from 'react';
import useForm from 'react-hook-form';
import Datatable from '../common/datatable';

import UtilsService from '../../services/utils';
import SchoolService from '../../services/school';

import EditBoard from './editBoard';
import { FILE_URL } from '../../constants/actionTypes'

function UpdateSchoolData(props) {

    const [modal, setModal] = useState();
    const [modalData, setModalData] = useState();

    let schoolDetailsId = props.match.params.schoolDetailsId;

    const editBoardData = (data) => {
        setModalData(data)
        toggle();
    }

    const toggle = () => {
        setModal(!modal)
    }

    const multipleImageHandler = (imagesObject) => {
        let imageArray = []
        for (let index = 0; index < imagesObject.length; index++) {
            const element = imagesObject[index];
            imageArray.push(element);
        }
        return imageArray
    }
    const uploadImage = async () => {
        let formData = new FormData();
        formData.append("schoolDetailsId", schoolDetails._id);

        imageUpload.forEach(eachImage => {
            formData.append('image', eachImage)
        });
        let response = await SchoolService.uploadGalleryImages(formData);
        if (response.data.status) {
            window.location.reload();
        }
    }

    const columnsDynamic = [
        {
            Header: <b>Board Name</b>,
            accessor: 'board.name',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Board Medium</b>,
            accessor: 'medium.name',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>Action</b>,
            id: 'edit',
            accessor: str => "edit",
            Cell: (row) => (
                <div className="btn-group">
                    <button className="btn btn btn-success" type="button" onClick={() => editBoardData(row.original)}>
                        <span className="" >Edit</span>
                    </button>
                </div>
            ),
            style: {
                textAlign: 'center'
            },
            sortable: false
        }
    ]


    // utils
    const [boardingType, setBoardingType] = useState([]);
    const [boards, setBoards] = useState([])
    const [educationMedium, setEducationMedium] = useState([])
    const [facilities, setFacilities] = useState([])
    const [schoolType, setSchoolType] = useState([])

    // images
    const [imageUpload, setImageUpload] = useState([])

    // school details
    const [schoolDetails, setschoolDetails] = useState([])

    const { register, handleSubmit, errors } = useForm();

    const onSubmitSchoolDetails = async (item) => {
        let payload = item
        payload.abbrevations = item.abbrevations.split(",")
        payload.schoolPhone = item.schoolPhone.split(",")
        payload.schoolType = schoolDetails.schoolType
        payload.boardingType = schoolDetails.boardingType
        payload.schoolDetailsId = schoolDetails._id

        let response = await SchoolService.updateSchoolDetails(item);
        console.log("response", response);
        // props.history.push("/viewSchools")
    }

    async function fetchSchoolData(payload) {
        let fetchSchoolData = await SchoolService.fetchSchoolDetails(payload);
        console.log("fetchSchoolData", fetchSchoolData);
        setschoolDetails(fetchSchoolData.fetchedSchool)
    }

    async function fetchUtils() {
        let utilsData = await UtilsService.fetchUtils();
        console.log("utilsData", utilsData);
        setBoardingType(utilsData.boardingType);
        setBoards(utilsData.boards);
        setEducationMedium(utilsData.educationMedium);
        setFacilities(utilsData.facilities);
        setSchoolType(utilsData.schoolType);
    }

    const handleChange = (updateFunction, value) => {
        updateFunction(prevstate => ({ ...prevstate, ...value }))
    }

    useEffect(() => {
        fetchSchoolData({ schoolDetailsId: schoolDetailsId })
        fetchUtils()
    }, [])

    useEffect(() => { }, [schoolDetails])

    return (
        <div className="container">
            <div className="card" >
                <div className="card-header ml-3">
                    <h5>Update School Details</h5>
                </div>

                <form className="form mx-3 my-3" onSubmit={handleSubmit(onSubmitSchoolDetails)}>
                    <div className="form-group">
                        <label for="schoolName">School Unique</label>
                        <input type="text" className="form-control" name="schoolUnique" id="schoolUnique" value={schoolDetails.schoolUnique} disabled />
                    </div>
                    <div className='row my-2'>
                        <div className='col-12'>
                            <div className="form-group">
                                <label for="schoolName">School Name</label>
                                <input type="text" className="form-control" name="schoolName" id="schoolName" value={schoolDetails.schoolName} disabled />
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="schoolEmail">School Email</label>
                                <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" className="form-control" name="schoolEmail" id="schoolEmail" value={schoolDetails.schoolEmail} disabled />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="pincode">Pincode</label>
                                <input type="number" className="form-control" name="pincode" id="pincode" value={schoolDetails.pincode} disabled />
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="firstAddress">First Address</label>
                                <input type="text" placeholder='First Address' className="form-control" name="firstAddress" id="firstAddress" defaultValue={schoolDetails.firstAddress} ref={register} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="secondAddress">Second Address</label>
                                <input type="text" placeholder='First Address' className="form-control" name="secondAddress" id="secondAddress" defaultValue={schoolDetails.secondAddress} ref={register} />
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="landmark">Landmark</label>
                                <input type="text" placeholder='Landmark' className="form-control" name="landmark" id="landmark" defaultValue={schoolDetails.landmark} ref={register} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="establishmentYear">Establishment Year</label>
                                <input type="number" placeholder='Establishment Year' className="form-control" name="establishmentYear" id="establishmentYear" defaultValue={schoolDetails.establishmentYear} ref={register} />
                            </div>
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="firstAddress">School Code</label>
                                <input type="text" placeholder='School Code' className="form-control" name="schoolCode" id="schoolCode" defaultValue={schoolDetails.schoolCode} ref={register} />
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="website">School Website</label>
                                <input type="url" placeholder='Establishment Year' className="form-control" name="website" id="website" defaultValue={schoolDetails.website} ref={register} />
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="abbrevations">Abbrevations</label>
                                <input type="text" placeholder='Abbrevations' className="form-control" name="abbrevations" id="abbrevations" defaultValue={schoolDetails.abbrevations && schoolDetails.abbrevations.toString()} ref={register} />
                                <small id="abbrevationsHelp" className="form-text text-muted">Comman Seprated</small>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="schoolPhone">School Phone</label>
                                <input type="text" placeholder='School Phone' className="form-control" name="schoolPhone" id="schoolPhone" defaultValue={schoolDetails.schoolPhone && schoolDetails.schoolPhone.toString()} ref={register} />
                                <small id="schoolPhoneHelp" className="form-text text-muted">Comman Seprated</small>
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="schoolType">School Type</label>
                                <select id="schoolType"
                                    name="schoolType"
                                    className="form-control"
                                    onChange={(e) => { handleChange(setschoolDetails, { schoolType: e.target.value }) }}
                                    value={schoolDetails.schoolType ? schoolDetails.schoolType : 'default'}
                                    ref={register({ validate: value => value !== '' })} >
                                    <option value="default">--Select--</option>
                                    {schoolType.map((items, index) => {
                                        return (
                                            <option value={items._id} key={items._id}>{items.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="form-group">
                                <label for="boardingType">Boarding Type</label>
                                <select id="boardingType"
                                    name="boardingType"
                                    className="form-control"
                                    onChange={(e) => { handleChange(setschoolDetails, { boardingType: e.target.value }) }}
                                    value={schoolDetails.boardingType ? schoolDetails.boardingType : 'default'}
                                    ref={register({ validate: value => value !== '' })}>
                                    <option value="default">--Select--</option>
                                    {boardingType.map((items, index) => {
                                        return (
                                            <option value={items._id} key={items._id}>{items.name}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-12'>
                            <label for="schoolMoto">School Moto</label>
                            <input type="text" placeholder='schoolMoto' className="form-control" name="schoolMoto" id="schoolMoto" defaultValue={schoolDetails.schoolMoto} ref={register} />
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-12'>
                            <label for="schoolDescription">School Description</label>
                            <textarea placeholder='schoolDescription' className="form-control" name="schoolDescription" id="schoolDescription" defaultValue={schoolDetails.schoolDescription} ref={register} />
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-4'>
                            <label for="facebookLink">Facebook Link</label>
                            <input type="url" placeholder='Facebook Link' className="form-control" name="facebookLink" id="facebookLink" defaultValue={schoolDetails.facebookLink} ref={register} />
                        </div>
                        <div className='col-4'>
                            <label for="instaLink">Insta Link</label>
                            <input type="url" placeholder='Insta Link' className="form-control" name="instaLink" id="instaLink" defaultValue={schoolDetails.instaLink} ref={register} />
                        </div>
                        <div className='col-4'>
                            <label for="twitterLink">Twitter Link</label>
                            <input type="url" placeholder='Twitter Link' className="form-control" name="twitterLink" id="twitterLink" defaultValue={schoolDetails.twitterLink} ref={register} />
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-6'>
                            <label for="trustName">Trust Name</label>
                            <input type="text" placeholder='Trust Name' className="form-control" name="trustName" id="trustName" defaultValue={schoolDetails.trustName} ref={register} />
                        </div>
                        <div className='col-6'>
                            <label for="branchName">Branch Name</label>
                            <input type="text" placeholder='Branch Name' className="form-control" name="branchName" id="branchName" defaultValue={schoolDetails.branchName} ref={register} />
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-4'>
                            <label for="noOfClass">No of Class</label>
                            <input type="number" placeholder='No of Class' className="form-control" name="noOfClass" id="noOfClass" defaultValue={schoolDetails.noOfClass} ref={register} />
                        </div>
                        <div className='col-4'>
                            <label for="noOfTeachers">No of Teachers</label>
                            <input type="number" placeholder='No of Teachers' className="form-control" name="noOfTeachers" id="noOfTeachers" defaultValue={schoolDetails.noOfTeachers} ref={register} />
                        </div>
                        <div className='col-4'>
                            <label for="noOfStudents">No of Students</label>
                            <input type="number" placeholder='noOfStudents' className="form-control" name="noOfStudents" id="noOfStudents" defaultValue={schoolDetails.noOfStudents} ref={register} />
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-4'>
                            <label for="differentlyAbled">Differently Abled</label>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="differentlyAbled" id="differentlyAbled" value={true} ref={register} />
                                <label className="form-check-label" for="differentlyAbled" >Yes</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="differentlyAbled" id="differentlyAbled" value={false} defaultChecked ref={register} />
                                <label className="form-check-label" for="differentlyAbled" >No</label>
                            </div>
                        </div>
                        <div className='col-8'>
                            <label for="googleMaps">Google Maps</label>
                            <input type="text" placeholder='Google Map link' className="form-control" name="googleMaps" id="googleMaps" defaultValue={schoolDetails.googleMaps} ref={register} />
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-12'>
                            <label for="facilities">Facilities</label>
                            {facilities.map((items, index) => {
                                if (schoolDetails.facilities && schoolDetails.facilities.some(item => item === items._id)) {
                                    return (
                                        <div className="form-check form-check" key={items._id}>
                                            <input className="form-check-input"
                                                type="checkbox"
                                                name="facilities"
                                                defaultChecked
                                                value={items._id}
                                                ref={register} />
                                            <label className="form-check-label" >{items.name}</label>
                                        </div>
                                    )
                                }
                                else {
                                    return (
                                        <div className="form-check form-check" key={items._id}>
                                            <input className="form-check-input"
                                                type="checkbox"
                                                name="facilities"
                                                value={items._id}
                                                ref={register} />
                                            <label className="form-check-label" >{items.name}</label>
                                        </div>
                                    )
                                }

                            })}
                        </div>
                    </div>

                    <div className='row my-2'>
                        <div className='col-12'>

                            <button className="btn btn btn-success" type="button" onClick={() => editBoardData({ schoolDetailsId: schoolDetails._id })}>
                                <span className="" >Add Board</span>
                            </button>

                            <div className="table-responsive">
                                <Datatable
                                    myData={schoolDetails.schoolBoard && schoolDetails.schoolBoard}
                                    columns={columnsDynamic}
                                    pageSize={schoolDetails.schoolBoard && schoolDetails.schoolBoard.length}
                                    myClass='ReactTable'
                                />
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>

                <form className=' form mx-3 my-3' name="submitImage">
                    <div className='row my-2'>

                        {schoolDetails.gallery && schoolDetails.gallery.map((items, index) => {
                            return (
                                <img src={FILE_URL + items.link} style={{ width: "50%", height: "50%" }} alt="Image not found" key={items._id} />
                            )
                        })}
                    </div>
                    <div className='row my-2'>
                        <h1>Gallery Image</h1>
                        <div className='col-10'>
                            <input type='file'
                                className='form-control'
                                name='galleryImage'
                                multiple='multiple'
                                accept='image/*'
                                onChange={(e) => { let imageArray = multipleImageHandler(e.target.files); setImageUpload(imageArray); }} />
                        </div>
                        <div className='col-2'>
                            <button type='button' onClick={uploadImage} className="btn btn-secondary">Upload</button>
                        </div>
                    </div>
                </form>
            </div>
            {modal ? <EditBoard toggle={toggle} modal={modal} modalData={modalData} masterData={{ boards: boards, educationMedium: educationMedium }} /> : null}
        </div>

    );
}

export default UpdateSchoolData;
