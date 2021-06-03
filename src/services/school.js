import Instance from './apiServiceConfig';
import { API_URL } from '../constants/actionTypes'
import { toast } from 'react-toastify';

import { ADD_SCHOOL_USER_SUCCESS, ADD_SCHOOL_USER_FAILED, FETCHED_SCHOOL_DETAILS_FAILED, UPDATED_SCHOOL_DETAILS_SUCCESS, UPDATED_SCHOOL_DETAILS_FAILED } from '../constants/toastMessages';

async function addSchoolUser(payload) {
    const addSchoolUserData = await Instance.Instance.post(`${API_URL}admin/school-admin/add-school-user`, payload)
    if (addSchoolUserData && addSchoolUserData.status === 200) {
        toast.success(ADD_SCHOOL_USER_SUCCESS)
        return addSchoolUserData.data.data;
    }
    else {
        toast.error(addSchoolUserData.error || ADD_SCHOOL_USER_FAILED)
    }
    return [];
}

async function fetchSchools(payload) {
    const fetchSchoolsData = await Instance.Instance.post(`${API_URL}admin/school-admin/get-schools`, payload)
    if (fetchSchoolsData && fetchSchoolsData.status === 200) {
        return fetchSchoolsData.data.data;
    }
    else {
        toast.error(fetchSchoolsData.error || ADD_SCHOOL_USER_FAILED)
    }
    return {};
}

async function fetchSchoolDetails(payload) {
    const fetchSchoolsData = await Instance.Instance.post(`${API_URL}admin/school-admin/get-school`, payload)
    if (fetchSchoolsData && fetchSchoolsData.status === 200) {
        return fetchSchoolsData.data.data;
    }
    else {
        toast.error(fetchSchoolsData.error || FETCHED_SCHOOL_DETAILS_FAILED)
    }
    return {};
}

async function updateSchoolDetails(payload) {
    const updateSchoolsData = await Instance.Instance.post(`${API_URL}admin/school-admin/update-school-details`, payload)
    if (updateSchoolsData && updateSchoolsData.status === 200) {
        toast.success(updateSchoolsData.message || UPDATED_SCHOOL_DETAILS_SUCCESS)
    }
    else {
        toast.error(updateSchoolsData.error || UPDATED_SCHOOL_DETAILS_FAILED)
    }
    return updateSchoolsData;
}

async function updateSchoolBoard(payload) {
    const updateSchoolBoard = await Instance.Instance.post(`${API_URL}admin/school-admin/update-school-board`, payload)
    if (updateSchoolBoard && updateSchoolBoard.status === 200) {
        toast.success(updateSchoolBoard.message || UPDATED_SCHOOL_DETAILS_SUCCESS)
    }
    else {
        toast.error(updateSchoolBoard.error || UPDATED_SCHOOL_DETAILS_FAILED)
    }
    return updateSchoolBoard;
}

async function addSchoolBoard(payload) {
    const addSchoolBoard = await Instance.Instance.post(`${API_URL}admin/school-admin/add-school-board`, payload)
    if (addSchoolBoard && addSchoolBoard.status === 200) {
        toast.success(addSchoolBoard.message || UPDATED_SCHOOL_DETAILS_SUCCESS)
    }
    else {
        toast.error(addSchoolBoard.error || UPDATED_SCHOOL_DETAILS_FAILED)
    }
    return addSchoolBoard;
}

async function uploadGalleryImages(payload) {
    const uploadGalleryImage = await Instance.MultipartInstance.post(`${API_URL}admin/school-admin/upload-gallery-image`, payload)
    if (uploadGalleryImage && uploadGalleryImage.status === 200) {
        toast.success(uploadGalleryImage.message || UPDATED_SCHOOL_DETAILS_SUCCESS)
    }
    else {
        toast.error(uploadGalleryImage.error || UPDATED_SCHOOL_DETAILS_FAILED)
    }
    return uploadGalleryImage;
}

export default {
    addSchoolUser,
    fetchSchools,
    fetchSchoolDetails,
    updateSchoolDetails,
    updateSchoolBoard,
    addSchoolBoard,
    uploadGalleryImages
};