import axios from "axios";

export default function getUserDetails(){

    const token = localStorage.getItem('joyMediaToken');

    return axios.get('https://linked-posts.routemisr.com/users/profile-data', {
        headers : {
            token
        }
    })
}