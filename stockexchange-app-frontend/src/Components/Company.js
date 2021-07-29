import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Navbar from './navbar'
import AddCompanyFields from './AddCompanyFields'
import TitleHeader from './companyheader';
import AddCompanyButton from './AddCompanyButton'
import CustomizedTables from './CompanyContent';
import SelectLocation from "./searchBar"

class Companies extends Component{
    render(){
        var userRole = sessionStorage.getItem("useRole")
        console.log(userRole)

        return <div>
            <Navbar/> 
            <TitleHeader/>
            {(userRole === "admin")&&<AddCompanyButton/>}
            <CustomizedTables/>
            <SelectLocation />
        </div>
    }
}
export default Companies