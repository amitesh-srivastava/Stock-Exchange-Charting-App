import React,{Component} from 'react';
import Navbar from './navbar'
import SectorHeader from './sectorheader';
import AddSectorButton from './AddSectorButton';
import CustomizedTables from './SectorContent'

class Sectors extends Component{
    render(){
        var userRole = sessionStorage.getItem("useRole")
        console.log(userRole)

        return <div>
            <Navbar/> 
            <SectorHeader/>
            {(userRole === "admin")&&<AddSectorButton/>}
            <CustomizedTables/>
        </div>
    }
}
export default Sectors