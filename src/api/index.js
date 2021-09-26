import axios from 'axios';

//const url = 'https://mern-project-learning-memories.herokuapp.com/posts';
//const url = 'http://localhost:5000/posts';

const API = axios.create({baseURL:'http://localhost:5000'})

/* export const fetchPosts = () => { return axios.get(url) };
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => {
    console.log('Inside updatePost api: ', updatedPost);
    return axios.patch(`${url}/${id}`, updatedPost)};
export const deletePost =(id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); */

API.interceptors.request.use((req)=>{
if(localStorage.getItem('profile')){
    req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;    
}
return req;
});

export const fetchPosts = () => { return API.get('/posts') };
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => {
    console.log('Inside updatePost api: ', updatedPost);
    return API.patch(`/posts/${id}`, updatedPost)};
export const deletePost =(id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signIn=(formData)=>{return API.post('/user/signin',formData)};
export const signUp=(formData)=>{return API.post('/user/signup',formData)};
