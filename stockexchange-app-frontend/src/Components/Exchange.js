import React,{Component} from 'react';
import Navbar from './navbar'
import CustomizedTables from './ExchangeContent'
import ExchangeHeader from './ExchangeHeader';
import AddExchangeButton from './AddExchangeButton';
import Mapping from './MappingButton'

class Exchange extends Component{
    render(){
        var userRole = sessionStorage.getItem("useRole")
        console.log(userRole)
        return <div>
            <Navbar/> 
            <ExchangeHeader/>
            {(userRole === "admin")&&<AddExchangeButton/>}
            <CustomizedTables/>
            {(userRole === "admin")&&<Mapping />}
        </div>
    }
}
export default Exchange