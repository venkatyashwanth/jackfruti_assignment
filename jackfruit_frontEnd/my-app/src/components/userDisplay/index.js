import './index.css'

const DisplayOut = (props) =>{
    // const {information} = props;
    const {userInfo} = props;
    let city;
    if(userInfo[7] === true){
        city = "Metro"
    }else{
        city = "Non-Metro"
    }
    return(
        <div className="DisplayBox">
            <h1>Hello User, Confirm Your Details</h1>
            <p>Basic Salary: {userInfo[0]}</p>
            <p>Leave Travel Allowance: {userInfo[1]}</p>
            <p>Home Rent Allowance: {userInfo[2]}</p>
            <p>Food Allowance: {userInfo[3]}</p>
            <p>Investments: {userInfo[4]}</p>
            <p>Actual Rent: {userInfo[5]}</p>
            <p>MediClaim Policy: {userInfo[6]}</p>
            <p>CityType: {city}</p>
        </div>
    )
}

export default DisplayOut