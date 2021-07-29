import React,{Component} from 'react';
import Navbar from './navbar'
import CustomizedTables from './IpoContent'
import IpoHeader from './IpoHeader';
import AddIpoButton from './AddIpoButton.js';

class IPO extends Component{
    render(){
        var userRole = sessionStorage.getItem("useRole")
        console.log(userRole)
        return <div>
            <Navbar/> 
            <IpoHeader/>
            {(userRole === "admin")&&<AddIpoButton/>}
            <CustomizedTables/>
        </div>
    }
}
export default IPO