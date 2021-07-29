import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Company from './Company'

import Navbar from './navbar'
import Sector from './Sector'
import Exchange from './Exchange'
import IPO from './IPO'
import AddCompanyFields from './AddCompanyFields'
import AddExchangeFields from "./AddExchangeFields";
import AddIpoFields from "./AddIpoFields";
import AddSectorFields from "./AddSectorFields";
import ImportData from "./ImportData"
import AddMapping from "./AddMapping"
import SignIn from "./signIn"
import ComparisionChart from "./Comparision"
import Comparision2 from "./ComparisionContent2"
import SignUp from "./SignUp"

export default function Dashboard() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path = "/Company">
                <Company />
            </Route>

            <Route exact path = "/Sector">
                <Sector />
            </Route>

            <Route exact path = "/Exchange">
                <Exchange />
            </Route>

            <Route exact path = "/Ipo">
                <IPO />
            </Route>

            <Route exact path = "/AddCompany">
                <AddCompanyFields />
            </Route>

            <Route exact path = "/AddExchange">
                <AddExchangeFields />
            </Route>

            <Route exact path = "/AddIpo">
                <AddIpoFields />
            </Route>

            <Route exact path = "/AddSector">
                <AddSectorFields />
            </Route>
            
            <Route exact path = "/UploadFile">
                <ImportData />
            </Route>

            <Route exact path = "/AddMapping">
                <AddMapping />
            </Route>

            <Route exact path = "/Navbar">
                <Navbar />
            </Route>

            <Route exact path = "/Comparision">
                <ComparisionChart />
            </Route>

            <Route exact path = "/Comparision2">
                <Comparision2 />
            </Route>

            <Route exact path = "/signUp">
                <SignUp />
            </Route>
          
            <Route path="/">
              <SignIn />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }