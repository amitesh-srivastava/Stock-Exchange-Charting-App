
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
import Modal from 'react-modal';

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

function createData(iid, pps, nos, odt) {
  return {iid, pps, nos, odt};
}

var rows = []

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


export default function CustomizedTables() {

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

  const [cName, setCName] = useState("");
  const [stkExName, setStkExName] = useState("");
  const [pps, setPps] = useState();
  const [ts, setTs] = useState();
  const [opd, setOpd] = useState();
  const [opt, setOpt] = useState();
  const [id, setId] = useState("");

  const handleSave = () => {
    var dateObj = new Date(opd + ' ' + opt);
    var stkExs = stkExName.split(",");
    const article = {"id":id,"pricePerShare":pps ,"totalNumberOfShares":ts,"openDateTime":dateObj,"companyName":cName,"stockExchangeNames":stkExs}
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/addIpo', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
  };

  const changeCName = ({ target }) => {
    setCName(target.value);
    rows =[];
  };

  const changeStk = ({ target }) => {
    setStkExName(target.value);
    rows =[];
  };

  const changePps = ({ target }) => {
    setPps(target.value);
    rows =[];
  };

  const changeTs = ({ target }) => {
    setTs(target.value);
    rows =[];
  };

  const changeOpd = ({ target }) => {
    setOpd(target.value);
    rows =[];
  };

  const changeOpt = ({ target }) => {
    setOpt(target.value);
    rows =[];
  };


  const classes = useStyles();
  const [ipo, setIpo] = useState([]);

  const [count, setCount] = useState(0);
  const getToken = async () => {
      const ipos = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/getAllIpo',
      {
        headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
      }
      )
      setIpo(ipos.data)
      console.log(ipos.data)
    };

    useEffect(() => {
      getToken();
      rows = []
    },[count]);
  
  if(Array.isArray(ipo) && ipo.length>0){
    for(var i =0;i<ipo.length;++i){
        rows.push(createData(ipo[i].id, ipo[i].pricePerShare, ipo[i].totalNumberOfShares, ipo[i].openDateTime));
    } 
  } 
  console.log(rows);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = (val) => {
    console.log(val)
    setId(val)
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
    rows=[];
  }

  var userRole = sessionStorage.getItem("useRole")
  console.log(userRole)
  
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>IPO ID</StyledTableCell>
              <StyledTableCell align="right">Price Per Share</StyledTableCell>
              <StyledTableCell align="right">Number of Share</StyledTableCell>
              <StyledTableCell align="right">Open Date Time</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.iid}
                </StyledTableCell>
                <StyledTableCell align="right">{row.pps}</StyledTableCell>
                <StyledTableCell align="right">{row.nos}</StyledTableCell>
                <StyledTableCell align="right">{row.odt}</StyledTableCell>
                <StyledTableCell align="right"> {(userRole === "admin")&&<Button onClick={()=>{openModal(row.iid)}} variant="contained" color="secondary" startIcon={<EditIcon />}>Edit</Button>}</StyledTableCell>
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
        contentLabel="Edit IPO Details"
      >
        <div style = {{"textAlign":"center","fontSize":"30px","color":"#e33371"}}>Edit IPO Details</div>
        <form style = {{"marginTop":"20px"}}>
          <input placeholder = "Company Name" style = {{"width":"100%"}} value = {cName} onChange={changeCName}></input>
          <br/><br/>
          <input placeholder = "Stock Exchange Name" style = {{"width":"100%"}} value = {stkExName} onChange={changeStk}></input>
          <br/><br/>
          <input type = "number" placeholder = "Price per Share" style = {{"width":"100%"}} value = {pps} onChange={changePps}></input>
          <br/><br/>
          <input type = "number" placeholder = "Total Number of Shares" style = {{"width":"100%"}} value = {ts} onChange={changeTs} ></input>
          <br/><br/>
          <input type = "date" placeholder = "Open Time" style = {{"width":"100%"}} value = {opd} onChange={changeOpd} ></input>
          <br/><br/>
          <input type = "time" placeholder = "Open Dae" style = {{"width":"100%"}} value = {opt} onChange={changeOpt} ></input>
          <br/><br/>
          <Button onClick = {handleSave} type = "submit" variant="contained" color="secondary" style={{"marginLeft":"35%"}}>Save</Button>
        </form>
        </Modal>

      </div>
  );
}
