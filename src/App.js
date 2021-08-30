import logo from './logo.svg';
import './App.css';
import Styled from 'styled-components';
import Home from './components/Home'
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';

import SaarthiLogo from './assets/saarthi_logo.svg';

const AppHeader = Styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  border-bottom : 1px solid black;
  background-color: #fafafa;
  padding: 10px;
  position: fixed;
  width: 100%;
  top: 0px;
`;

const SelectOption = Styled.select`
  width : 150px;
  padding : 5px;
  border-radius : 5px;
`;

function App() {
  const [BotId , setBotId] = useState(1);
  const SelectBotId = (e) =>{
    const botid = e.target.value;
    setBotId(botid);  
  }
  return (
    <>
    <div>
    {/* <div style={{width:"10%", backgroundColor:"blue"}}>
    </div> 
    style={{display:"flex",flexWrap:"wrap", width:"100%"}}
    style={{width:"90%"}}
    */}
    <div>
    <AppHeader>
      <div>
        <div
        style={{
          //height: "44px",
          color: "#1b1b1b",
          fontFamily: "Lato",
          fontSize: "24px",
          fontWeight: "700",
          letterSpacing: "0.57px",
          lineHeight: "28px",
          padding: "6px 20px",
        }}
        > Chat History </div>
       <span> <strong>&nbsp;&nbsp; Select Bot Id &nbsp;&nbsp;</strong></span> 
      <SelectOption id="selectBotId" onChange={SelectBotId}>
      <option value="">1</option>
      <option value="1000">1000</option>
      <option value="1001">1001</option>
      <option value="1002">1002</option>
      <option value="1003">1003</option>
      <option value="1004">1004</option>
      <option value="1005">1005</option>
      <option value="1006">1006</option>
      <option value="1007">1007</option>
      <option value="1008">1008</option>
      <option value="12">12</option>
      <option value="155">155</option>
      <option value="2">2</option>
      <option value="221">221</option>
      <option value="222">222</option>
      <option value="333">333</option>
      <option value="4">4</option>
      <option value="420">420</option>
      <option value="44">44</option>
      <option value="444">444</option>
      <option value="5">5</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="555">555</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="77">77</option>
      <option value="8">8</option>
      </SelectOption>
      </div>
      <div>
        <span style={{
          width: "165px",
          height: "45px",
          top: "29px",
          fontFamily: "Lato",
          fontStyle: "normal",
          fontWeight: "300",
          fontSize: "16px",
          lineHeight: "19px",
          textAlign: "right",
          letterSpacing: "0.380952px",
          color: "#cccccc",
          padding: "4px",
        }}
        id="welcome_saarthi">Welcome</span> 
        <span style={{
          height: "45px",
          top: "29px",
          fontFamily: "Lato",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "16px",
          lineHeight: "19px",
          textAlign: "right",
          letterSpacing: "0.380952px",
          color: "#1b1b1b",
        }} 
        >Gamut Analytics</span>
        <span></span>
      </div>
    </AppHeader>
   {/* queryUrl={"http://dashboard.saarthi.ai/Query 62/stream?format=json&token=shhh&params=botid:55|from_date:2021-08-17|to_date:2021-08-23"} */}
    <div className="App" style={{
      position: 'relative',
      top:"100px",
      }}>
      <Home botId = {BotId}/>
    </div>
    </div>
    </div>
    </>
  );
}

export default App;
