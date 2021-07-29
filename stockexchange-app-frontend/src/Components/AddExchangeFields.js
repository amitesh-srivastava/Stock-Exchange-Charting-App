import React from 'react';
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


import { useState, useEffect } from 'react';

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

function AddExchangeFields() {
    const classes = useStyles();

  const [stkName, setStkName] = useState("");
  const [stkDesc, setStkDesc] = useState("");
  const [add, setAdd] = useState("");
  const [rem, setRem] = useState("");


  const handleClick = () => {
    const article = {"name":stkName,"address":add,"description":stkDesc,"remarks":rem};
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/exchange/addStockExchange', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
    
    
  };

  const changestockName = ({ target }) => {
    setStkName(target.value);
  };

  const changeDesc = ({ target }) => {
    setStkDesc(target.value);
  };

  const changeAdd = ({ target }) => {
    setAdd(target.value);
  };

  const changeRem = ({ target }) => {
    setRem(target.value);
  };

    return (
        <div style={useStyles.paperContainer}>
            <div style={{"backgroundColor":"white","text-align": "centre","color":"red","border": "3px solid #2196f3","margin":"auto","width":"60%", "marginTop":"10%"}}>
                <h1 style={{"margin":"auto","text-align": "centre","color":"#2196f3","width":"50%","marginBottom":"40px"}}>Add New Stock Exchange</h1> 
                <form> 
                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Stock Exchange Name</FormLabel>
                    <TextField style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {stkName} onChange={changestockName} />       
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Stock Exchange Description</FormLabel>
                    <TextField style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {stkDesc} onChange={changeDesc} />       
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Address</FormLabel>
                    <TextField style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {add} onChange={changeAdd} />       
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginLeft":"30px"}}>Remarks</FormLabel>
                    <TextField style={{"float": "right","marginRight":"30px","width":"50%","marginTop":"-20px"}} id="filled-basic" label="To be Filled" variant="filled" value = {rem} onChange={changeRem} />
                    
                    <div className={classes.root}>
                      <Link to ="/Exchange" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button onClick={handleClick} variant="contained" color="primary" type = "submit" style = {{"marginLeft":"29%","marginBottom":"10px","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px","marginTop":"20px"}}> Add Exchange</Button>
                      </Link>
                      <Link to ="/Exchange" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="primary" type = "submit" 
                      style = {{"marginLeft":"29%","marginBottom":"5%","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px"}}> Go back</Button></Link>
                  </div>
                </form>
            </div>
        </div>
    );
  }

export default AddExchangeFields
