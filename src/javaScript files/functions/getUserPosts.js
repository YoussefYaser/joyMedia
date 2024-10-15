import axios from "axios";

export default function getUserPosts(){

    const token = localStorage.getItem('joyMediaToken');

    return axios.get('https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts', {
        headers : {
            token 
        }
    });
}