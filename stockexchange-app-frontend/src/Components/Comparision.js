import React,{Component} from 'react';
import Navbar from './navbar'
import Comparision from './ComparisonContent'
import ComparisionHeader from './ComparisionHeader';
import Comparision2 from "./ComparisionContent2"

class ComparisionChart extends Component{
    render(){
        return <div>
            <Navbar/> 
            <ComparisionHeader/>            
            <Comparision />
            <br></br><br></br>
            <Comparision2 />
        </div>
    }
}
export default ComparisionChart