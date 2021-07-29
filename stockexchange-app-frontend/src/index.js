import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ReactDOM from 'react-dom';
import AddCompanyFields from './Components/AddCompanyFields'
import Navbar from './Components/navbar'
import Company from './Components/Company'
import CustomizedTables from './Components/CompanyContent'
import TitleHeader from './Components/companyheader'
import AddCompanyButton from './Components/AddCompanyButton'
import Sector from './Components/Sector'
import AddSectorFields from './Components/AddSectorFields'
import Exchange from './Components/Exchange'
import AddExchangeFields from './Components/AddExchangeFields'
import AddIpoFields from './Components/AddIpoFields'
import BasicDateTimePicker from './check'
import IPO from './Components/IPO'
import Dashboard from './Components/Dashboard'
import SheetJSApp from './Components/StockPriceUpload'

ReactDOM.render(<Dashboard/>, document.getElementById('root'));
