import React, { Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ReactDOM from 'react-dom';
import FormLabel from '@material-ui/core/FormLabel';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
   '& > *': {
     margin: theme.spacing(1),
     width: '40ch',

     //margin: '20ch',
     
   },  

 },
}));



function AddSectorFields() {
    const classes = useStyles();

  const [secName, setSecName] = useState("");
  const [secDesc, setSecDesc] = useState("");

  const handleClick = () => {
    const article = {"sectorName":secName,"brief":secDesc};
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/sector/addSector', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
    
    
  };

  const changeSecName = ({ target }) => {
    setSecName(target.value);
  };

  const changeDesc = ({ target }) => {
    setSecDesc(target.value);
  };

    return (
        <div style={useStyles.paperContainer}>
            <div style={{"backgroundColor":"white","text-align": "centre","color":"red","border": "3px solid #2196f3","margin":"auto","width":"50%", "marginTop":"10%"}}>
                <h1 style={{"margin":"auto","text-align": "centre","color":"#2196f3","width":"50%","marginBottom":"40px"}}>Create New Sector</h1> 
                <form> 
                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Sector Name</FormLabel>
                    <TextField style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled"  value = {secName} onChange={changeSecName} />
                    
                    <br></br><br></br><br></br><br></br>
                    <FormLabel style={{"marginLeft":"30px"}}>Sector Brief</FormLabel>
                    <TextField style={{"float": "right","marginRight":"30px","width":"50%","marginTop":"-20px"}} id="filled-basic" label="To be Filled" variant="filled"   value = {secDesc} onChange={changeDesc}/>
                    <div className={classes.root}>
                      <Link to ="/Sector" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button onClick={handleClick} variant="contained" color="primary" type = "submit" style = {{"marginLeft":"29%","marginBottom":"10px","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px","marginTop":"20px"}}> Add Sector</Button>
                      </Link>
                      <Link to ="/Sector" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="primary" type = "submit" 
                      style = {{"marginLeft":"29%","marginBottom":"5%","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px"}}> Go back</Button></Link>
                  </div>
                </form>
            </div>
        </div>
    );
  }

export default AddSectorFields
