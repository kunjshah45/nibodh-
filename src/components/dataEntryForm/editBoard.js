import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import useForm from 'react-hook-form';

import SchoolService from '../../services/school';

function EditBoardData(props) {

    const [boardData, setBoardData] = useState(props.modalData);


    useEffect(() => { console.log("boardData", boardData); }, [boardData])
    const { register, handleSubmit, errors } = useForm();

    const { masterData, schoolDetailsId } = props;
    const { boards, educationMedium } = masterData;

    const onEditBoardData = async (item) => {

        let { toggle } = props;

        if (boardData._id) {
            let boardId = boardData.board._id ? boardData.board._id : boardData.board;
            let mediumId = boardData.medium._id ? boardData.medium._id: boardData.medium;
            boardData.board = boardId;
            boardData.medium = mediumId;
            boardData.updateBoardId = boardData._id
            let response = await SchoolService.updateSchoolBoard(boardData);
        }
        else {
            let response = await SchoolService.addSchoolBoard(boardData);
        }
        toggle();
        window.location.reload();
    }

    const handleChange = (updateFunction, value) => {
        updateFunction(prevstate => ({ ...prevstate, ...value }))
    }

    return (
        <Modal isOpen={props.modal} toggle={props.toggle} size='lg'>
            <ModalHeader toggle={props.toggle}>
                <div className='row'>
                    <div className='col-sm-10'>
                        <div className='media'>
                            <div className='media-body align-self-center'>
                                EDIT BOARD
                            </div>
                        </div>
                    </div>
                </div>
            </ModalHeader>
            <ModalBody>
                <div className='card'>
                    <form className='form mx-3 my-3' onSubmit={handleSubmit(onEditBoardData)}>
                        <div className='card-body ml-4'>
                            <div className='form-group row my-2'>
                                <label className='col-sm-4 col-form-label'>Board</label>
                                <div className='col-sm-8'>
                                    <select id='board'
                                        required
                                        name='board'
                                        className='form-control'
                                        onChange={(e) => { handleChange(setBoardData, { board: e.target.value }) }}
                                        value={boardData.board ? boardData.board._id : 'default'}>
                                        <option value='default'>--Select--</option>
                                        {boards.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='form-group row my-2'>
                                <label className='col-sm-4 col-form-label'>Medium</label>
                                <div className='col-sm-8'>
                                    <select id='medium'
                                        required
                                        name='medium'
                                        className='form-control'
                                        onChange={(e) => { handleChange(setBoardData, { medium: e.target.value }) }}
                                        value={boardData.medium ? boardData.medium._id : 'default'}>
                                        <option value='default'>--Select--</option>
                                        {educationMedium.map((items, index) => {
                                            return (
                                                <option value={items._id} key={items._id}>{items.name}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='form-group row my-2'>
                                <label className='col-sm-4 col-form-label'>Management Type</label>
                                <div className='col-sm-8'>
                                    <input type='text'
                                        className='form-control'
                                        name='managementType'
                                        defaultValue={boardData.managementType}
                                        onChange={(e) => { handleChange(setBoardData, { managementType: e.target.value }) }} />
                                </div>
                            </div>

                        </div>

                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </ModalBody>
        </Modal>

    );
}

export default EditBoardData;