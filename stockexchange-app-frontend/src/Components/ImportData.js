import React,{Component} from 'react';
import Navbar from './navbar'
import CustomizedTables from './ExchangeContent'
import ExchangeHeader from './ExchangeHeader';
import AddExchangeButton from './AddExchangeButton';
import SheetJSApp from './StockPriceUpload';

class ImportData extends Component{
    render(){
        var userRole = sessionStorage.getItem("useRole")
        console.log(userRole)
        return <div>
            <Navbar/> 
            {(userRole === "admin")&&<SheetJSApp/>}
        </div>
    }
}
export default ImportData