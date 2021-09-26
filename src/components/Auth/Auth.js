import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom'
import {Avatar,Paper,Grid,Typography,Container,Button} from '@material-ui/core';
import {GoogleLogin} from 'react-google-login';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import Icon from './icon';

import useStyles from './styles';

import {signup,signin} from '../../actions/auth';

const Auth = () => {
    //const state=null;
    const authFormDataInitialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
    const classes=useStyles();
    const dispatch=useDispatch();
    const history=useHistory();

    const [isSignUp,setisSignUp]= useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(authFormDataInitialState);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        if(isSignUp){
            dispatch(signup(formData,history));
        }else{
            dispatch(signin(formData,history));
        }
    };
    const handleChange =(e) =>{
        setFormData({ ...formData, [e.target.name]:e.target.value});
    };
    const handleShowPassword =()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword);
    };
    const switchMode =()=>{
        setisSignUp((previsSignUp)=>!previsSignUp);
        handleShowPassword(false);
    };

    const googleSuccess= async (res)=>{
        const result = res?.profileObj;
        const token =res?.tokenId;

        try {
            //dispatch an action
            dispatch({type:'AUTH',data:{result,token}});
            history.push('/');
        } catch (error) {
            console.log(error);
            
        }
    };

    const googleFailure=(error)=>{
        
        console.log('Google Sign In was unsuccessful. Try again later!');
        console.log(error);
    };

    return (
        <Container component="main" maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp? 'Sign Up':'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleOnSubmit}>
                    <Grid container spacing={2}>
                        {
                         isSignUp && (
                            <>
                                <Input name='firstName' label='First Name' autoFocus handleChange={handleChange} half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                         )}
                         <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                         <Input name='password' label='Password' handleChange={handleChange} type={showPassword?'text':'password'} handleShowPassword={handleShowPassword} />
                            {
                                isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'  />
                            }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                            {isSignUp?'Sign Up':'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="223700519610-gujl0f7gqeb6h2oisr14jtp4u6ns80pi.apps.googleusercontent.com"
                        render={(renderProps)=>(
                            <Button 
                            className={classes.googleButton}
                            color="primary"
                            variant='contained'
                            fullWidth
                            disabled={renderProps.disabled}
                            onClick={renderProps.onClick}
                            startIcon={<Icon />}
                            >
                            Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    
                    <Grid container justify="flex-end">
                            <Grid item>
                                <Button fullWidth onClick={switchMode}>{isSignUp?'Already have an account? Sign In':'Dont have an account? Sign Up'} </Button>
                            </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
    );
};

export default Auth;
