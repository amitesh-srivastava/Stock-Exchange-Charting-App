import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

import ReactDOM from "react-dom";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import Modal from 'react-modal';
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));

export default function Comparision2() {
    const chartData = [
        {
            label: "IT",
            value: 290
        },
        {
            label: "Agro",
            value: 260
        }
    ];

    // STEP 3 - Creating the JSON object to store the chart configurations

    const classes = useStyles();

    const [sect1, setsect1] = useState("");
    const [sect2, setsect2] = useState("");
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [p1, setP1] = useState("");
    const [p2, setP2] = useState();

    const [count, setCount] = useState();

    const [chartArr, setChartArr] = useState([]);

    const changeSect1 = ({ target }) => {
        setsect1(target.value);
    };

    const changeSect2 = ({ target }) => {
        setsect2(target.value);
    };

    const changeFrom = ({ target }) => {
        setFrom(target.value);
    };

    const changeTo = ({ target }) => {
        setTo(target.value);
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

    const openModal = () => {
        handleClick();
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function afterOpenModal() {
    }




    function handleClick() {
        getSectPrice1();
        var arrayy = []
        //console.log(p1.length)
        if(p1!==""){
            for (var i = 0; i < p1.length; ++i) {  
                var z = p1[i].datee.split("T") 
                arrayy.push({ "label": z[0], "value": p1[i].shareprice })
            }
            setChartArr(arrayy)
            //console.log(chartArr)
        }
    }

    const [arr, setArr] = useState([]);

    const getSectPrice1 = async () => {
        if (sect1 !== "" && from !== "" && to !== "") {
            //console.log(sect1,from,to)
            const prices = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/getCompanyStockPrice?id=' + sect1 + "&from=" + from + "&to=" + to,
            {
                headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
              }
            );
            //console.log(prices.data)
            setP1(prices.data);
        }
    }


    const getToken = async () => {
        const comps = await axios.get('https://amiteshstockexchangebackend.herokuapp.com/company/getAllCompanies',
        {
            headers: { 'Authorization': 'Bearer '+sessionStorage.getItem("token")}
        }
        )
        setArr(comps.data)
    };


    getSectPrice1();

    useEffect(() => {
        getToken();
    }, [count]);

    const chartConfigs = {
        type: "column2d",
        width: "700",
        height: "400",
        dataFormat: "json",
        dataSource: {
            chart: {
                caption: "Stock Price Comparasion From " + from + " To " + to,
                subCaption: "Stock Price in Rs",
                xAxisName: "Date of Stock prices",
                yAxisName: "Stock Price",
                theme: "fusion"
            },
            // Chart Data
            data: chartArr
        }
    };


    return (
        <fieldset style ={{"border":"4px solid Blue","margin":"auto","width":"60%"}}>
        <legend style ={{"color":"#651fff","fontSize":"20px"}}>Stocks Related to The Company Chart</legend>
            <div className="select-container">
                <select value={sect1} onChange={changeSect1} style={{ "marginLeft": "200px", "width": "625px", "height": "50px", "marginBottom": "10px" }}>
                    {arr.map((option) => (
                        <option value={option.id}>{option.companyName}</option>
                    ))}
                </select>
            </div>

            <div className={classes.root}>
                <div>
                    <br></br>
                    <label style={{ "marginLeft": "200px" }}>From Period</label>
                    <TextField
                        id="outlined-full-width"
                        placeholder="From"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        style={{ "textAlign": "center", "marginLeft": "200px", "width": "93%", "marginTop": "-3px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        type="date"
                        value={from}
                        onChange={changeFrom}
                    />
                </div>
            </div>

            <div className={classes.root}>
                <div>
                    <label style={{ "marginLeft": "200px" }}>To Period</label>
                    <TextField
                        id="outlined-full-width"
                        placeholder="To"
                        style={{ margin: 8 }}
                        fullWidth
                        margin="normal"
                        style={{ "textAlign": "center", "marginLeft": "200px", "width": "95%", "marginTop": "-2px" }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        type="date"
                        value={to}
                        onChange={changeTo}
                    />
                </div>
            </div>
            <br />
            <Button onClick={openModal} variant="contained" color="primary" style={{ "marginLeft": "45%" }}>Generate Chart</Button>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div>
                    <ReactFC {...chartConfigs} />
                </div>
            </Modal>

        </fieldset>

    );
}
