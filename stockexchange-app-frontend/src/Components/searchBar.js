/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Modal from 'react-modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

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





export default function ComboBox() {
    const [company, setCompany] = useState([]);
    const [count, setCount] = useState(0);
    const [modalIsOpen, setIsOpen] = React.useState(false);


    const classes = useStyles();

    const getToken = async () => {
        const companies = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/company/getAllCompanies',
        {
            headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
          }
        )
        setCompany(companies.data)
        console.log(companies.data)
    };

    const [show, setShow] = useState([])
    if(show === null){
        setShow({companyName:"",turnover:"",ceo:"",boardOfDirectors:"",sectorName:"",companyBrief:""})
    }
    //console.log(show.companyName)
    useEffect(() => {
        if (count < 1) {
            getToken();
        }
    }, [count]);

    const openModal = () => {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal() {
        setIsOpen(false);
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


    return (
        <div style={{ "marginTop": "30px", "marginLeft":"40%"}}>
            <Autocomplete
                onChange={(event, value) => setShow(value)}
                id="combo-box-demo"
                options={company}
                getOptionLabel={(option) => option.companyName}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Search Box" variant="outlined" />}
            />
            <div className={classes.root}>
                <Button onClick={openModal} variant="contained" color="secondary">Show Company Full Details</Button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Company Details">

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Company Name</StyledTableCell>
                                <StyledTableCell align="right">CEO</StyledTableCell>
                                <StyledTableCell align="right">Sector Name</StyledTableCell>
                                <StyledTableCell align="right">Board of Directors</StyledTableCell>
                                <StyledTableCell align="right">Brief</StyledTableCell>
                                <StyledTableCell align="right">Turnover</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                <StyledTableRow>
                                    {show!== null && <StyledTableCell align="right">{show.companyName} </StyledTableCell>}
                                    {show!== null && <StyledTableCell align="right">{show.ceo}</StyledTableCell>}
                                    {show!== null && <StyledTableCell align="right">{show.sectorName}</StyledTableCell>}
                                    {show!== null &&  <StyledTableCell align="right">{show.boardOfDirectors}</StyledTableCell>}
                                    {show!== null && <StyledTableCell align="right">{show.companyBrief}</StyledTableCell>}
                                    {show!== null && <StyledTableCell align="right">{show.turnover}</StyledTableCell>}
                                </StyledTableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Modal>
        </div>
    );
}
