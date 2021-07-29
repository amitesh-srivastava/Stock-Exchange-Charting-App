import React, { Component, useRef } from 'react'
import TextField from '@material-ui/core/TextField';
import ReactDOM from 'react-dom';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
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



function AddMapping() {
  const classes = useStyles();

  const [companyName, setCompanyName] = useState("");
  const [stk, setStk] = useState("");
  const [compCode, setCompCode] = useState("");


  const handleClick = () => {
    const article = {"companyName":companyName,"stockName":stk,"companyCode":compCode};
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/addMapping', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
    
    
  };

  const changeCompanyName = ({ target }) => {
    setCompanyName(target.value);
  };

  const changeStkName = ({ target }) => {
    setStk(target.value);
  };

  const changeCompCode = ({ target }) => {
    setCompCode(target.value);
  };
  
    return (
        <div style={useStyles.paperContainer}>
          
            <div style={{"backgroundColor":"white","text-align": "centre","color":"red","border": "3px solid #2196f3","margin":"auto","width":"50%", "marginTop":"20px"}}>
                <h1 style={{"margin":"auto","text-align": "centre","color":"#2196f3","width":"40%","marginBottom":"40px"}}>Add New Mapping</h1> 
                <form> 
                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Company Name</FormLabel>
                    <TextField required style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {companyName} onChange={changeCompanyName} />
                    
                    <br></br><br></br><br></br><br></br>
                    <FormLabel style={{"marginLeft":"30px"}}>Stock Exchange Name</FormLabel>
                    <TextField style={{"float": "right","marginRight":"30px","width":"50%","marginTop":"-20px"}} id="filled-basic" label="To be Filled" variant="filled" value = {stk} onChange={changeStkName}/>

                    <br></br><br></br><br></br><br></br>
                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Company Code</FormLabel>
                    <TextField style={{"float": "right","marginTop":"20px","marginRight":"30px","width":"50%","marginTop":"-20px"}} id="filled-basic" label="To be Filled" variant="filled" value = {compCode} onChange={changeCompCode}/>

                    <div className={classes.root}>
                      <Link to ="/Exchange" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button onClick={handleClick} variant="contained" color="primary" type = "submit" style = {{"marginLeft":"29%","marginBottom":"10px","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px","marginTop":"20px"}}> Add Mapping</Button>
                      </Link>
                      <Link to ="/Exchange" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="primary" type = "submit" 
                      style = {{"marginLeft":"29%","marginBottom":"5%","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px"}}> GO back</Button></Link>
                   </div>
                </form>
            </div>
        </div>
    );
  }

export default AddMapping