var API_LINK, FILE_LINK;

const testAdminAddr = 'testexpapp.nibodh.com';
const localhostAdminAddr = 'localhost';
if (window.location.href.indexOf(testAdminAddr) > -1 || window.location.href.indexOf(localhostAdminAddr) > -1) {
    API_LINK = 'https://nibodh-backend.herokuapp.com/api/';
    // API_LINK = 'https://testexpapp.nibodh.com/api/';
    FILE_LINK = 'https://nibodh-educare-v1.s3.us-east-2.amazonaws.com/';
} else {
    // API_LINK = 'http://localhost:3000/api/';
    API_LINK = 'https://prodn.nibodh.com/api/';
    FILE_LINK = 'https://nibodh-educare-v1.s3.us-east-2.amazonaws.com/';
    // API_LINK = 'https://testexpapp.nibodh.com/api/';
}
export const API_URL = API_LINK;
export const FILE_URL = FILE_LINK;