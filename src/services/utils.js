import Instance from './apiServiceConfig';
import { API_URL } from '../constants/actionTypes'
import { toast } from 'react-toastify';

import { FETCH_UTILS_SUCCESS, FETCH_UTILS_FAILED } from '../constants/toastMessages';

async function fetchUtils() {
    const utilsData = await Instance.Instance.post(`${API_URL}utils/general/get-utils`)
    if (utilsData && utilsData.status === 200) {
        return utilsData.data.data;
    }
    else {
        toast.error(utilsData.error || FETCH_UTILS_FAILED)
    }
    return {};
}

export default {
    fetchUtils,
};