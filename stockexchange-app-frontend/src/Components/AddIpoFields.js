import React, { Fragment, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ReactDOM from 'react-dom';
import FormLabel from '@material-ui/core/FormLabel';
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import { DateTimePicker } from "@material-ui/pickers";
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

//const [value, setValue] = React.useState(new Date('2018-01-01T00:00:00.000Z'));


function AddIpoFields() {
    const classes = useStyles();

    const [cName, setCName] = useState("");
    const [stkExName, setStkExName] = useState("");
    const [pps, setPps] = useState();
    const [ts, setTs] = useState();
    const [opd, setOpd] = useState();
    const [opt, setOpt] = useState();
  
  
    const handleClick = () => {
      var dateObj = new Date(opd + ' ' + opt);
      var stkExs = stkExName.split(",");
      const article = {"pricePerShare":pps ,"totalNumberOfShares":ts,"openDateTime":dateObj,"companyName":cName,"stockExchangeNames":stkExs}
      axios.post('https://amiteshstockexchangebackend.herokuapp.com/addIpo', article,
      {
        headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
      }
      )
    };
  
    const changeCName = ({ target }) => {
      setCName(target.value);
    };
  
    const changeStk = ({ target }) => {
      setStkExName(target.value);
    };
  
    const changePps = ({ target }) => {
      setPps(target.value);
    };
  
    const changeTs = ({ target }) => {
      setTs(target.value);
    };

    const changeOpd = ({ target }) => {
      setOpd(target.value);
    };
  
    const changeOpt = ({ target }) => {
      setOpt(target.value);
    };

    return (
        <div style={useStyles.paperContainer}>
            <div style={{"backgroundColor":"white","text-align": "centre","color":"red","border": "3px solid #2196f3","margin":"auto","width":"50%", "marginTop":"7%"}}>
                <h1 style={{"margin":"auto","text-align": "centre","color":"#2196f3","width":"20%","marginBottom":"40px"}}>Add IPO</h1> 
                <form> 
                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Company Name</FormLabel>
                    <TextField style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {cName} onChange={changeCName} />       
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Stock Exchange Name</FormLabel>
                    <TextField style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {stkExName} onChange={changeStk} />       
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Price per share</FormLabel>
                    <TextField type={"number"} style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" label="To be Filled" variant="filled" value = {pps} onChange={changePps} />       
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginLeft":"30px"}}>Total shares</FormLabel>
                    <TextField type={"number"} style={{"float": "right","marginRight":"30px","width":"50%","marginTop":"-20px"}} id="filled-basic" label="To be Filled" variant="filled" value = {ts} onChange={changeTs} />
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Open Date</FormLabel>                    
                    <TextField type = "date" style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" variant="filled"  value = {opd} onChange={changeOpd}/>
                    <br></br><br></br><br></br><br></br>

                    <FormLabel style={{"marginTop":"40px","marginLeft":"30px"}}>Open Time</FormLabel>                    
                    <TextField type = "time" style={{"float": "right","marginTop":"-20px","marginRight":"30px","width":"50%"}} id="filled-basic" variant="filled" value = {opt} onChange={changeOpt}/>
                    
                    <div className={classes.root}>
                      <Link to ="/Ipo" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button onClick={handleClick} variant="contained" color="primary" type = "submit" style = {{"marginLeft":"29%","marginBottom":"10px","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px","marginTop":"20px"}}> Add IPO</Button>
                      </Link>
                      <Link to ="/Ipo" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="primary" type = "submit" 
                      style = {{"marginLeft":"29%","marginBottom":"5%","text-align": "centre","width":"30%","lineHeight":"170%","fontSize":"17px"}}> Go back</Button></Link>
                  </div>
                </form>
            </div>
        </div>
    );
  }

export default AddIpoFields
