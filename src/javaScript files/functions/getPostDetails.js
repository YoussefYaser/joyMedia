import axios from "axios";

export default function getPostDetails(id){
    const token = localStorage.getItem('joyMediaToken');
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers : {
            token
        }
    });
}