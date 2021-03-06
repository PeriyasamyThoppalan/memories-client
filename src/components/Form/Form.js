import React, {useState,useEffect} from 'react';


import {Paper,Typography,TextField,Button} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch,useSelector } from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';

import useStyles from './styles';  

// GET THE CURRENT ID of the memory

const Form = ({currentId,setCurrentId}) => {
    const classes=useStyles();
    //const [postData,setPostData]=useState({creator:'',title:'',message:'',tags:'',selectedFile:'' });
    const [postData,setPostData]=useState({title:'',message:'',tags:'',selectedFile:'' });
    
    const dispatch=useDispatch();
    const post=useSelector((state)=> currentId? state.posts.find((p)=>p._id===currentId):null)
    const user=JSON.parse(localStorage.getItem('profile'));

    
    useEffect(()=>{
        if(post) setPostData(post);        
    },[post])

    const handlePost= async (e)=>{
        e.preventDefault();
        console.log('Value of currentId: ', currentId);
        console.log('Inside HandlePost method: ', postData);
        currentId ? dispatch(updatePost(currentId,{...postData,name:user?.result?.name})):dispatch(createPost({...postData,name:user?.result?.name}))
        /* if(currentId===0 || currentId===null){
            dispatch(createPost(postData));            
            //clear();
        }
        else{
            dispatch(updatePost(currentId,postData));
            //clear();
        }
     */
    clear();
    }

    const clear=()=>{
        setCurrentId(null);
        //setPostData({creator:'',title:'',message:'',tags:'',selectedFile:'' });
        setPostData({title:'',message:'',tags:'',selectedFile:'' });
    }
    
    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign In to create your own memories and like other's memories..
                </Typography>
            </Paper>
        )
    }

    return ( 
        <Paper className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate onSubmit={handlePost}>
                <Typography variant='h6'>{currentId?'Editing':'Creating'} a Memory</Typography>
                {/* <TextField name='creator' label='Creator' variant='outlined' fullWidth value={postData.creator} 
                onChange={(e)=>{setPostData({...postData,creator:e.target.value})}} /> */}
                <TextField name='title' label='Title' variant='outlined' fullWidth value={postData.title} 
                onChange={(e)=>{setPostData({...postData,title:e.target.value})}} />
                <TextField name='message' label='Message' variant='outlined' fullWidth value={postData.message} 
                onChange={(e)=>{setPostData({...postData,message:e.target.value})}} />
                <TextField name='tags' label='Tags' variant='outlined' fullWidth value={postData.tags} 
                onChange={(e)=>{setPostData({...postData,tags:e.target.value.split(',')})}} />      
                <div className={classes.fileInput}>
                    <FileBase type='file' multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})} />                    
                </div>
                
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='Submit' fullWidth>Submit</Button>        
                <Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>          

            </form>
        </Paper>
     );
}
 
export default Form;