import { FETCH_ALL, CREATE, UPDATE, DELETE,LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

//Action Creators

export const getPosts = () => async (dispatch) => {
  try {
    
    const { data } = await api.fetchPosts();
    

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    console.log('data before dispatch of updatePost API : updatePost', data);
    console.log('Inside updatePost action: ', data);

    dispatch({ type: UPDATE, payload: data });
    console.log('After dispatching updatePost action: ', data);

  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({type:DELETE,payload:id})
  } catch (error) {
    console.log(error);
  }

};

export const likePost =(id) => async(dispatch) =>{
  try {
    console.log('FE: ACTION CREATOR DISPATCHED:BEFORE API CALL LIKEPOST')
    const {data}=await api.likePost(id);
    console.log('FE: ACTION CREATOR DISPATCHED:AFTER API CALL LIKEPOST')

    dispatch({type:LIKE,payload:data});
    console.log(data);
    console.log('FE: ACTION CREATOR DISPATCHED:AFTER Dispatching type=LIKE reducer');

  } catch (error) {
    console.log(error);
  }
}