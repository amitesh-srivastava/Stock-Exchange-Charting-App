import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AddIpoButton() {
  const classes = useStyles();

  return (
    <div className={classes.root} style = {{"float":"right", "marginBottom":"10px"}}>
      <Link to = "/AddIpo" style={{ textDecoration: 'none' }}><Button variant="contained" color="secondary">
        Add Ipo
      </Button></Link>
    </div>
  );
}
