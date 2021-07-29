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

export default function AddExchangeButton() {
  const classes = useStyles();

  return (
    <div className={classes.root} style = {{"float":"right","marginBottom":"10px"}}>
      <Link to = "/AddExchange" style={{ textDecoration: 'none' }}><Button variant="contained" color="secondary">
        Add Exchange
      </Button>
      </Link>
    </div>
  );
}
