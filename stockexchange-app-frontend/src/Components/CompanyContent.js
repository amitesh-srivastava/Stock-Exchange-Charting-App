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
import AddCompanyFields from './AddCompanyFields';

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

function createData(cid, cName, ceo, sector, stkexc) {
  return { cid, cName, ceo, sector, stkexc };
}

function createIpoData(id, pps, tns, odt) {
  return { id, pps, tns, odt };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

var rows = []


export default function CustomizedTables() {
  const [companyName, setCompanyName] = useState("");
  const [ceoName, setCeoName] = useState("");
  const [bod, setBod] = useState("");
  const [cBrief, setCBrief] = useState("");
  const [sName, setSName] = useState("");
  const [turn, setTurn] = useState();
  const [id, setID] = useState();

  const changeCompanyName = ({ target }) => {
    setCompanyName(target.value);
    rows = [];
  };

  const changeCeoName = ({ target }) => {
    setCeoName(target.value);
    rows = [];
  };

  const changeBod = ({ target }) => {
    setBod(target.value);
    rows = [];
  };

  const changeBrief = ({ target }) => {
    setCBrief(target.value);
    rows = [];
  };

  const changeSector = ({ target }) => {
    setSName(target.value);
    rows = [];
  };

  const changeTurn = ({ target }) => {
    setTurn(target.value);
    rows = [];
  };



  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal2IsOpen, setModal2] = React.useState(false);

  const openModal2 = (val) => {
    console.log(val)
    setModal2(true);
    rows = [];
    getIpo(val);
    rows = [];
  }

  const openModal = (val) => {
    setID(val)
    rows = []
    setIsOpen(true);
    rows = [];
  }

  var [IpoDet, setIpoDet] = useState([]);
  var [ipoid, setipoid] = useState();
  var [ipopps, setipopps] = useState();
  var [ipotns, setipotns] = useState();
  var [ipostks, setipotks] = useState();

  const [liscomp2, setliscomp2] = useState([]);

  const getIpo = async (id) => {
    rows = [];
    const ipos = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/company/getIpoDetails/' + id,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    );
    console.log(ipos.data)
    rows = [];
    setipoid(ipos.data.id);
    rows = [];
    setipopps(ipos.data.pricePerShare);
    rows = [];
    setipotns(ipos.data.totalNumberOfShares);
    rows = [];
    setipotks(ipos.data.openDateTime);
    rows = [];

  }

  const handleSave = () => {
    const article = { "id": id, "companyName": companyName, "turnover": turn, "ceo": ceoName, "boardOfDirectors": bod, "sectorName": sName, "companyBrief": cBrief };
    axios.post('https://amiteshstockexchangebackend.herokuapp.com/company/addCompany', article,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    );

  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = '#f00';
    rows = []
  }

  function closeModal() {
    setIsOpen(false);
    setModal2(false);
    rows = [];
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

  const classes = useStyles();
  const [company, setCompany] = useState([]);
  const [count, setCount] = useState(0);
  const getToken = async () => {
    const companies = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/company/getAllCompanies',
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
    setCompany(companies.data)
  };


  useEffect(() => {
    rows = []
    getToken();
    rows = []
  }, [count]);


  if (Array.isArray(company) && company.length > 0) {
    for (var i = 0; i < company.length; ++i) {
      rows.push(createData(company[i].id, company[i].companyName, company[i].ceo, company[i].sectorName));
    }
  }
  const handleClick = (val) => {
    axios.delete('https://amiteshstockexchangebackend.herokuapp.com/company/deleteCompany/' + val,
    {
      headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
    }
    )
    window.location.reload(false);
  };

  var userRole = sessionStorage.getItem("useRole")
  console.log(userRole)

  var pows = [{ cid: "1", cName: "2", ceo: "ami", sector: "ajdbcs" }]
  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Company Name</StyledTableCell>
              <StyledTableCell align="right">CEO</StyledTableCell>
              <StyledTableCell align="right">Sector Name</StyledTableCell>
              <StyledTableCell align="right">Show IPO</StyledTableCell>
              <StyledTableCell align="right">Edit</StyledTableCell>
              <StyledTableCell align="right">Remove</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.cName}>
                <StyledTableCell component="th" scope="row">
                  {row.cName}
                </StyledTableCell>
                <StyledTableCell align="right">{row.ceo}</StyledTableCell>
                <StyledTableCell align="right">{row.sector}</StyledTableCell>

                <StyledTableCell align="right">
                  <Button onClick={() => { openModal2(row.cid) }} variant="contained" color="secondary">Show Ipo</Button>
                </StyledTableCell>
                <StyledTableCell align="right">
                  {(userRole === "admin") &&
                    <Link to="/Company" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      <Button onClick={() => { openModal(row.cid) }} variant="contained" color="secondary" startIcon={<EditIcon />}>Edit</Button></Link>}</StyledTableCell>
                <StyledTableCell align="right">
                  {(userRole === "admin") &&
                    <Link to="/Company" style={{ color: 'inherit', textDecoration: 'inherit' }}>
                      <Button onClick={() => { handleClick(row.cid) }} variant="contained" color="secondary" startIcon={<DeleteIcon />}>Delete</Button></Link>}</StyledTableCell>
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
        <div style={{ "textAlign": "center", "fontSize": "30px", "color": "#e33371" }}>Edit company Details</div>
        <form style={{ "marginTop": "20px" }}>
          <input placeholder="Name" style={{ "width": "100%" }} value={companyName} onChange={changeCompanyName}></input>
          <br /><br />
          <input placeholder="CEO" style={{ "width": "100%" }} value={ceoName} onChange={changeCeoName}></input>
          <br /><br />
          <input placeholder="Board Of Directors" style={{ "width": "100%" }} value={bod} onChange={changeBod}></input>
          <br /><br />
          <input placeholder="Brief" style={{ "width": "100%" }} value={cBrief} onChange={changeBrief} ></input>
          <br /><br />
          <input placeholder="Sector" style={{ "width": "100%" }} value={sName} onChange={changeSector}></input>
          <br /><br />
          <input type="number" placeholder="TurnOver" style={{ "width": "100%" }} value={turn} onChange={changeTurn}></input>
          <br /><br />
          <Button onClick={handleSave} type="submit" variant="contained" color="secondary" style={{ "marginLeft": "35%" }}>Save</Button>
        </form>
      </Modal>
      <Modal
        isOpen={modal2IsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Company Details"
      >
        <table style={{ "border-collapse": "collapse" }}>
          <tr>
            <th>Ipo ID</th> &nbsp;&nbsp;
            <th>Price Per Share</th> &nbsp;&nbsp;
            <th>Total Number of Share</th> &nbsp;
            <th>Open Date Time</th> &nbsp;
          </tr>
          <tr>
            <td style={{ "textAlign": "center" }}>{ipoid}</td>&nbsp;
            <td style={{ "textAlign": "center" }}>{ipopps}</td>&nbsp;
            <td style={{ "textAlign": "center" }}>{ipotns}</td>&nbsp;
            <td style={{ "textAlign": "center" }}>{ipostks}</td>&nbsp;
          </tr>
        </table>

      </Modal>

    </div>


  );
}
