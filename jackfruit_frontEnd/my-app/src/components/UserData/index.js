import {Component} from 'react'
import DisplayOut from '../userDisplay'
import './index.css'

const DisplayResult = props=>{
    const {result} = props
    return(
        <div className="resultBox">
            <h1>Taxable Amount</h1>
            <h2>{result}</h2>
        </div>
    )
}


class UserData extends Component{
    state = {Bas: 0,LTA: 0,HRA: 0,FA:0,Inv:0,Rent:0,Med:0,cityType:true,appHRA:0,total:0,Tax: 0,display:false,results:false}

    basicSalary = event => {
        const v = parseFloat(event.target.value)
        this.setState({Bas:v})
    }

    leaveTravel = event =>{
        const v = parseFloat(event.target.value)
        this.setState({LTA:v})
    }
    houserent = event =>{
        const v = parseFloat(event.target.value)
        this.setState({HRA:v})
    }
    
    foodAllowance = event =>{
        const v = parseFloat(event.target.value)
        this.setState({FA:v})
    }

    investment = event =>{
        const v = parseFloat(event.target.value)
        this.setState({Inv:v})
    }

    actualRent = event => {
        const v = parseFloat(event.target.value)
        this.setState({Rent:v})
    }

    medPolicy = event => {
        const v = parseFloat(event.target.value)
        this.setState({Med:v})
    }

    option1 = event => {
        let v = event.target.value
        console.log(v)
        if (v === 'true'){
            v = true
        }else{
            v = false
        }


        this.setState({cityType:v})
    }

    appHra = (Bas,HRA,Rent,cityType) =>{
        Rent = parseFloat(Rent)
        HRA = parseFloat(HRA)
        Bas = parseFloat(Bas)

        let a;
        let b;
        let c;
        if(cityType === true){
            a = Bas * 0.5
            b = Rent - (0.1 * Bas)
            c = HRA
        }
        else if(cityType === false){
            a = Bas * 0.4
            b = Rent - (0.1 * Bas)
            c = HRA
        }
        
        let minValue;
        if(a<b && a<c){
            minValue = a
        }
        else if(b<c){
            minValue = b
        }else{
            minValue = c
        }
        this.setState({appHRA: minValue})
        this.computeTax()
    }

    computeTax = () =>{
        const {total,appHRA,Inv,Med} = this.state 
        const TaxInc = total-parseFloat(appHRA)-parseFloat(Inv)-parseFloat(Med)
        this.setState({Tax: TaxInc})
        
    }

    onCalculate = () =>{
        const {Bas,LTA,HRA,FA,Rent,cityType} = this.state
        const totalValue = parseFloat(Bas)+parseFloat(LTA)+parseFloat(HRA)+parseFloat(FA)
        this.setState({total:totalValue})
        this.appHra(Bas,HRA,Rent,cityType)
    }

    onSubmitForm = async event =>{
        event.preventDefault()
        this.onCalculate()
        const {Bas,LTA,HRA,FA,Inv,Rent,cityType,Med,Tax} = this.state
        const userDetails = [Bas,LTA,HRA,FA,Inv,Rent,cityType,Med,Tax]
        const url = 'http://localhost:3200/adddata/'
        const options = {
        method: 'POST',
        body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        console.log(response)
        
    }

    renderInputContainer1 = () =>{
        return (
            <div className="inputContainer1">
                <h1>Salary Details</h1>
                <div className="inputParameters">
                    <label htmlFor='basic'>Basic Salary</label>
                    <input type="text" id="basic" onChange={this.basicSalary}/>
                </div>
                <div className="inputParameters">
                    <label htmlFor="lta">Leave Travel Allowance</label>
                    <input type="text" id="lta" onChange={this.leaveTravel}/>
                </div>
                <div className="inputParameters">
                    <label htmlFor="hra">House Rent Allowance</label>
                    <input type="text" id="hra" onChange={this.houserent}/>
                </div>
                <div className="inputParameters">
                    <label htmlFor="fa">Food Allowance</label>
                    <input type="text" id="fa" onChange={this.foodAllowance}/>
                </div>
            </div>
        )
    }

    renderInputContainer2 = () =>{
        return(
            <div className="inputContainer2"> 
                <h1>Investment</h1>
                <div className="inputParameters">
                    <label htmlFor='inv'>Investments under 80c</label>
                    <input type="text" id="inv" onChange={this.investment}/>
                </div>
                <div className="inputParameters">
                    <label htmlFor="art">Acutal Rent Paid</label>
                    <input type="text" id="art" onChange={this.actualRent}/>
                </div>
                <div className="inputParameters">
                    <label htmlFor="mep">MedClaim Policy</label>
                    <input type="text" id="mep" onChange={this.medPolicy}/>
                </div>
                <div className="inputParameters1">
                    <div className="radio1"> 
                        <input type="radio" id="metNon" onChange={this.option1} value = "true" name="group1"/>
                        <label htmlFor="metNon">Metro</label>
                    </div>
                    <div className="radio2">
                        <input type="radio" id="metNon1" onChange={this.option1} value = "false" name="group1"/>
                        <label htmlFor="metNon1">NonMetro</label>
                    </div>
                </div>
            </div> 
        )
    }

    activeDisplay = () =>{
        this.setState({display:true})
    }

    showResult = () =>{
        this.setState({results:true})
    }

    callMultiple = () =>{
        this.showResult()
        this.onCalculate()
    }
        
    render(){
        const {Bas,LTA,HRA,FA,Inv,Rent,Med,cityType,Tax,display,results} = this.state
        return(
            <div>
                <div className="mainContainer">
                    <form onSubmit={this.onSubmitForm}  className="userForm">
                        <div>{this.renderInputContainer1()}</div>
                        <div>{this.renderInputContainer2()}</div>
                        <div className="btnContainer">
                            <button type="button" onClick ={this.activeDisplay}>
                                confirm
                            </button>
                            <button type="submit" className="btnEl" onClick={this.callMultiple}>  
                                Submit
                            </button>
                        </div>
                    </form>
                    <div>
                        {display && <DisplayOut userInfo = {[Bas,LTA,HRA,FA,Inv,Rent,Med,cityType]} />}
                        {results && <DisplayResult result = {Tax}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserData