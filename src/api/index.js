import axios from 'axios';

const url = 'https://mern-project-learning-memories.herokuapp.com/posts';

export const fetchPosts = () => { return axios.get(url) };
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => {
    console.log('Inside updatePost api: ', updatedPost);
    return axios.patch(`${url}/${id}`, updatedPost)};
export const deletePost =(id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);