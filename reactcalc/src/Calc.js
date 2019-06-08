import React from 'react'
import './css/Calc.css';

const tokenDict={
    "/": "÷",
    "*": "x",
    "CE":"CE",
    "C":"C",
    "del":"del",
    "-":"-",
    "+":"+",
    "=":"="
};
// <CalcOp name = 'CE' callback = opClick> 
class CalcOp extends React.Component{
    constructor(props){
        //props should be {op: 'CE', callback:opClick}
        super(props);
        this.state = {
            name: props.name,
            rendername: tokenDict[props.name]
        };
    }
    render(){
        return (
            //this just kinda works
            <span class = 'operator' id = {typeof(this.props.oid) === "undefined" ? this.props.id : this.state.name} onClick = {()=>this.props.callback(this.state.name)}> {this.state.rendername} </span> // not sure if you can pass args in the functional dec
        );
    }
}

// <CalcNum num = 9 callback = numClick> 
class CalcNum extends React.Component{
    constructor(props){
        //props should be {num: '7', callback:opClick} 
        super(props);
        this.state = {
            num: props.num,
        };
    }
    render(){
        return(
            <span class = 'numeral' id = {this.state.num} onClick = {()=>this.props.callback(this.state.num)}> {this.state.num} </span>
        );
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            equation: '',
            currNum: '',
            toClear: false,
        };
        this.opClick = this.opClick.bind(this);
        this.numClick = this.numClick.bind(this);
    }
    opClick = (opName) => {
        console.log("opClick called");
        var haveCleared = false;
        if(this.state.toClear){
            console.log("toClear called");
            this.setState(state=>({
                equation: state.currNum,
                currNum: '',
                toClear: false
            }));
            haveCleared=true;
        }
        switch (opName){
            case 'CE': // Im not commenting all of these you get the idea
                       // CE clears equation, C clears currNum, 
                       // del removes last char from currNum, = evaluates
                this.setState(state => ({
                    equation: '',
                    currNum: state.currNum,
                }));
                break;
            case 'C':
                this.setState( state => ({
                    equation: state.equation,
                    currNum: '',
                }));  
                break;
            case 'del':
                if(this.state.currNum.length < 1){
                    break;} // don't delete if already at 0 chars
                this.setState(state => ({
                    equation: state.equation,
                    currNum: state.currNum.replace(state.currNum.slice(-1), "")// long winded way of removing last char
                }));  
                break;
            case '=':
                var eeq = this.state.equation + this.state.currNum;
                var eev = eval(eeq); // ik this is dangerous bc its literally aribtrary code execution
                console.log(eeq + "=" + eev.toString());
                this.setState({
                    equation: eeq,
                    currNum: eev.toString(),
                    toClear: true,
                });
                break;

            default: // for /,x,-,+
                var eq;
                if(haveCleared){ eq = this.state.currNum + opName;}
                else{ eq = this.state.equation + this.state.currNum + opName;}
                this.setState({
                    equation: eq,
                    currNum: '',
                });
                break; // not needed
        }
    }
    numClick = (num) => {
        console.log("numCLick called");
        if(this.state.toClear){
            console.log("toClear called")
            this.setState(state => ({
                equation: state.currNum,
                currNum: '',
                toClear: true ,
            }));
        }
        this.setState(state => ({
            equation: state.equation,
            currNum: state.currNum + num,
        }));
    }
    render(){
        return(
        <div class = 'calcContainer'>
            <div class = 'equationWindow'> {this.state.equation}</div>
            <div class = 'currNumWindow'>  {this.state.currNum} </div>
            <div class = 'table'>
                <div class = 'row'>
                    <CalcOp name = 'CE' callback = {this.opClick}></CalcOp> <CalcOp name = 'C' callback = {this.opClick}></CalcOp> <CalcOp name = 'del' callback = {this.opClick}></CalcOp> <CalcOp name = '/' callback = {this.opClick}></CalcOp>
                </div>
                <div class = 'row'>
                    <CalcNum num = {'7'} callback = {this.numClick}></CalcNum> <CalcNum num = {'8'} callback = {this.numClick}></CalcNum> <CalcNum num = {'9'} callback = {this.numClick}></CalcNum> <CalcOp name = '*' callback = {this.opClick}></CalcOp>
                </div>
                <div class = 'row'>
                    <CalcNum num = {'4'} callback = {this.numClick}></CalcNum> <CalcNum num = {'5'} callback = {this.numClick}></CalcNum> <CalcNum num = {'6'} callback = {this.numClick}></CalcNum> <CalcOp name = '-' callback = {this.opClick}></CalcOp>
                </div>
                <div class = 'row'>
                    <CalcNum num = {'1'} callback = {this.numClick}></CalcNum> <CalcNum num = {'2'} callback = {this.numClick}></CalcNum> <CalcNum num = {'3'} callback = {this.numClick}></CalcNum> <CalcOp name = '+' callback = {this.opClick}></CalcOp>
                </div>
                <div class = 'row'>
                    <CalcNum num = {'0'} callback = {this.numClick}></CalcNum> <CalcNum num = {'.'} callback = {this.numClick}></CalcNum> <CalcOp name = '=' callback = {this.opClick} id = "eq"></CalcOp>
                </div>
            </div>
        </div>);
    }
}

export default Calculator;
