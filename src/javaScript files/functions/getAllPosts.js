import axios from "axios";

export default function getAllPosts(limit){

    const token = localStorage.getItem('joyMediaToken');

    return axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit}`, {
        headers : {
            token
        }
    });
}