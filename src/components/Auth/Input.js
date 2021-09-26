import React from 'react';
import {Grid,TextField,InputAdornment,IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const Input = ({half,name,label,type,autoFocus,handleChange,handleShowPassword}) => {
   return (
        <Grid item xs={12} sm={half?6:12}>
            <TextField 
                name={name}
                label={label}
                type={type}
                autoFocus={autoFocus}
                onChange={handleChange}
                variant='outlined'
                required
                fullWidth
                InputProps={name==='password' ? {
                        endAdornment:(
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword}>
                                    {type==='password'? <VisibilityOff/>:<Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }:null }                
            />
        </Grid>
    )
 };
export default Input;
