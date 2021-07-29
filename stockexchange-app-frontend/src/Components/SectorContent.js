
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
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';



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

function createData(sid, sectorName, sectorDesc) {
  return {sid, sectorName, sectorDesc};
}

var rows = []

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [secName, setSecName] = useState("");
  const [secDesc, setSecDesc] = useState("");
  const [id, setId] = useState("");
  
  const [modal2IsOpen, setModal2] = React.useState(false);

  const openModal = (val) => {
    setId(val)
    setIsOpen(true);
    rows =[];
  }

  const openModal2 = (val) => {
    setModal2(true);
    getCompanies(val);
    rows = [];
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
    rows =[]
  }

  function closeModal() {
    setIsOpen(false);
    setModal2(false);
    rows=[];
  }

  const [liscomp2, setliscomp2] = useState([]);

  const getCompanies = async (idComp) => {
    rows = []
    const comps = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/sector/getCompaniesInSector/'+idComp,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
    console.log(comps.data)
    setliscomp2(comps.data)

  };

  const handleSave = (event) => {
    const article = {"id":id,"sectorName":secName,"brief":secDesc};
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/sector/addSector', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    );
  
  };

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

  const classes = useStyles();
  const [sector, setSector] = useState([]);

  const [count, setCount] = useState(0);
  const getToken = async () => {
      const sectors = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/sector/allSectors',
      {
        headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
      }
      )
      setSector(sectors.data)
    };

    useEffect(() => {
      getToken();
      rows = []
    },[count]);
  
  if(Array.isArray(sector) && sector.length>0){
    for(var i =0;i<sector.length;++i){
        rows.push(createData(sector[i].id,sector[i].sectorName, sector[i].brief));
    } 
  } 

  const changeSecName = ({ target }) => {
    rows = []
    setSecName(target.value);
  };

  const changeDesc = ({ target }) => {
    rows = []
    setSecDesc(target.value);
  };

  const handleClick = (val) => {
    console.log(val);
    axios.delete('https://amiteshstockexchangebackend.herokuapp.com/sector/deleteSector/'+ val,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )  
    window.location.reload(false);
  };

  var userRole = sessionStorage.getItem("useRole")
  console.log(userRole)

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Sector Name</StyledTableCell>
              <StyledTableCell align="right">Sector Description</StyledTableCell>
              <StyledTableCell align="right">Show Companies</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.sectorName}>
                <StyledTableCell component="th" scope="row">
                  {row.sectorName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.sectorDesc}</StyledTableCell>
                <StyledTableCell align="right"> <Button onClick={() => { openModal2(row.sid)}} variant="contained" color="secondary">Show Companies</Button></StyledTableCell>
                <StyledTableCell align="right"> {(userRole === "admin")&&<Button onClick={()=>{openModal(row.sid)}} variant="contained" color="secondary" startIcon={<EditIcon />}>Edit</Button>}</StyledTableCell>
                <StyledTableCell align="right">{(userRole === "admin")&&< Button onClick ={()=>{handleClick(row.sid)}} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button>}</StyledTableCell>
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
        contentLabel="Edit Company Details"
      >
        <div style = {{"textAlign":"center","fontSize":"30px","color":"#e33371"}}>Edit company Details</div>
        <form style = {{"marginTop":"20px"}}>
          <input placeholder = "Sector Name" style = {{"width":"100%"}} value = {secName} onChange={changeSecName}  ></input>
          <br/><br/>
          <input placeholder = "Brief" style = {{"width":"100%"}} value = {secDesc} onChange={changeDesc}></input>
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
