
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Modal from 'react-modal';
import { purple } from '@material-ui/core/colors';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(eid, name, desc, address, rem) {
  return {eid, name, desc, address, rem};
}

var rows = []

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function purple123(id,repo){
  return {id,repo}
}

export default function CustomizedTables() {
  const classes = useStyles();
  const [exchange, setExchange] = useState([]);

  const [count, setCount] = useState(0);
  const getToken = async () => {
      const exchanges = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/exchange/getStockExchangeList',
      {
        headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
      }
      )
      setExchange(exchanges.data)
    };

   var liscomp = [{nid:0,comp:"dummy"}];


   const [nids, setnid] = useState();
   const [comi, setComi] = useState();
   const [liscomp2, setliscomp2] = useState([]);
  
  const [idComp, setidComp] = useState();

  const getCompanies = async (idComp) => {
      rows = []
      console.log(idComp)
      const comps = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/exchange/companies/'+idComp,
      {
        headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
      }
      )
    setliscomp2(comps.data)

    };
    


  const handleClick = (val) => {
      console.log(val);
      axios.delete('https://amiteshstockexchangebackend.herokuapp.com/exchange/deleteExchange/'+ val,
      {
        headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
      }
      )  
      window.location.reload(false);
  };

   
  
    useEffect(() => {
      getToken();
      rows = []
    },[liscomp2]);
  
  if(Array.isArray(exchange) && exchange.length>0){
    for(var i =0;i<exchange.length;++i){
        rows.push(createData(exchange[i].id,exchange[i].name,exchange[i].description, exchange[i].address, exchange[i].remarks));
    } 
  } 

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const [stkName, setStkName] = useState("");
  const [stkDesc, setStkDesc] = useState("");
  const [add, setAdd] = useState("");
  const [rem, setRem] = useState("");
  const [id, setId] = useState("");


  const handleSave = () => {
    const article = {"id":id,"name":stkName,"address":add,"description":stkDesc,"remarks":rem};
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/exchange/addStockExchange', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
  };

  const changestockName = ({ target }) => {
    setStkName(target.value);
    rows = [];
  };

  const changeDesc = ({ target }) => {
    setStkDesc(target.value);
    rows = [];
  };

  const changeAdd = ({ target }) => {
    setAdd(target.value);
    rows = [];
  };

  const changeRem = ({ target }) => {
    setRem(target.value);
    rows = [];
  };
  
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const [modal2IsOpen, setModal2] = React.useState(false);

  const openModal2 = (val) => {
    rows = []
    setModal2(true);
    rows = []
    getCompanies(val);
    rows = [];
  }

  const openModal = (val) => {
    rows = []
    setId(val)
    rows = []
    setIsOpen(true);
    rows =[];
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
    rows =[]
  }

  function closeModal() {
    setIsOpen(false);
    rows = []
    setModal2(false);
    rows=[];
  }

  var n = 9;
  //liscomp = [{nid:1,comp:"world"},{nid:2,comp:"My"}]
  liscomp.push({nid:n,comp:"world"})
  //console.log(liscomp)
  //console.log(pows)

  var userRole = sessionStorage.getItem("useRole")
  console.log(userRole)
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Remarks</StyledTableCell>
              <StyledTableCell align="right">Show Companies</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.desc}</StyledTableCell>
                <StyledTableCell align="right">{row.address}</StyledTableCell>
                <StyledTableCell align="right">{row.rem}</StyledTableCell>
                <StyledTableCell align="right">< Button onClick={() => { openModal2(row.eid)}} variant="contained" color="secondary">Show Companies</Button></StyledTableCell>
                <StyledTableCell align="right"> {(userRole === "admin")&&<Button onClick={()=>{openModal(row.eid)}}  variant="contained" color="secondary" startIcon={<EditIcon />}>Edit</Button>}</StyledTableCell>
                <StyledTableCell align="right"> {(userRole === "admin")&&<Button onClick ={()=>{handleClick(row.eid)}} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>}</StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Exchange Details"
      >
        <div style = {{"textAlign":"center","fontSize":"30px","color":"#e33371"}}>Edit Exchange Details</div>
        <form style = {{"marginTop":"20px"}}>
          <input placeholder = "Stock Exchange Name" style = {{"width":"100%"}} value = {stkName} onChange={changestockName}></input>
          <br/><br/>
          <input placeholder = "Description" style = {{"width":"100%"}} value = {stkDesc} onChange={changeDesc}></input>
          <br/><br/>
          <input placeholder = "Address" style = {{"width":"100%"}} value = {add} onChange={changeAdd}></input>
          <br/><br/>
          <input placeholder = "Remarks" style = {{"width":"100%"}} value = {rem} onChange={changeRem} ></input>
          <br/><br/>
          <Button onClick = {handleSave} type = "submit" variant="contained" color="secondary" style={{"marginLeft":"35%"}}>Save</Button>
        </form>
        </Modal>

      
      <Modal
        isOpen={modal2IsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Company Details"
      >
        
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>List Of Companies</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {liscomp2.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {row.companyName}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

      </Modal>

    </div>
  );
}
