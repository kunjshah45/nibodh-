import React, { useState, useEffect } from 'react';
import Datatable from '../common/datatable';
import SchoolService from '../../services/school';
import Pagination from 'react-js-pagination';
import moment from 'moment'

function ViewSchools(props) {
    const [data, setData] = useState([])
    const [activePage, setActivePage] = useState(1);
    const [totalData, setTotalData] = useState(1);

    const handlePageChange = data => {
        setActivePage(data)
    }

    const showSchool = data => {
        props.history.push("/updateSchool/" + data)
     }

    async function fetchSchools() {
        let schoolData = await SchoolService.fetchSchools({page: activePage});
        setData(schoolData.fetchedSchools);
        setTotalData(schoolData.totalDocument)
    }

    useEffect(() => {
        fetchSchools();
    }, [activePage])

    useEffect(() => {
    }, [data])

    const columnsDynamic = [
        {
            Header: <b>School Name</b>,
            accessor: 'schoolName',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>School Email</b>,
            accessor: 'schoolEmail',
            style: {
                textAlign: 'center'
            }
        },
        {
            Header: <b>School Unique</b>,
            accessor: 'schoolUnique',
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
                    <button className="btn btn btn-success" type="button" onClick={() => showSchool(row.original._id)}>
                        <span className="" > View </span>
                    </button>
                </div>
            ),
            style: {
                textAlign: 'center'
            },
            sortable: false
        }
    ]

    return (
        <div className="container">

            <div className="card">
                <div className="row ml-4 mr-4">
                    <div className="card-header">
                        <h5>View Schools</h5>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <Datatable
                            myData={data}
                            columns={columnsDynamic}
                            pageSize={20}
                            myClass='ReactTable'
                        />
                    </div>
                    <div className="mt-2 d-flex justify-content-center">
                        <Pagination
                            activePage={parseInt(activePage)}
                            itemsCountPerPage={50}
                            totalItemsCount={totalData}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                            itemClass="page-item"
                            linkClass="page-link" />
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ViewSchools;