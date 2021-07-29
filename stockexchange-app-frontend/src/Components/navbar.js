import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CustomizedTables from './CompanyContent';
import TitleHeader from './companyheader'



import Company from './Company'
import Sector from './Sector'
import Exchange from './Exchange'
import IPO from './IPO'


import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  function handleClick(){
    sessionStorage.setItem("useRole","")
    sessionStorage.setItem("token","")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="h6" className={classes.title}>
            StockExchangeApp
          </Typography>

          <Link to ="/UploadFile" style={{  color: 'inherit', textDecoration: 'inherit'}}><Button color="inherit">Import Data</Button></Link>
          <Link to ="/Company" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button color="inherit">Companies</Button></Link>
          <Link to ="/Sector" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button color="inherit">Sectors</Button></Link>
          <Link to ="/Exchange" style={{  color: 'inherit', textDecoration: 'inherit' }}><Button color="inherit">Stock Exchanges</Button></Link>
          <Link to ="/Ipo" style={{  color: 'inherit', textDecoration: 'inherit'}}><Button color="inherit">IPOs</Button></Link>
          <Link to ="/Comparision" style={{  color: 'inherit', textDecoration: 'inherit'}}><Button color="inherit">Comparision Detail</Button></Link>
          <Link to ="/" style={{  color: 'inherit', textDecoration: 'inherit'}}><Button color="inherit" onClick = {handleClick}>Logout</Button></Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}
