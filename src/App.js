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
  //background-color: crimson;
  border-bottom : 1px solid black;
  padding: 10px;
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
    <div style={{display:"flex",flexWrap:"wrap", width:"100%"}}>
    <div style={{width:"10%", backgroundColor:"blue"}}>
    </div>
    <div style={{width:"90%"}}>
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
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="1010">1010</option>
      <option value="10">10</option>
      <option value="">2</option>
      <option value="">25</option>
      <option value="">23</option>
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
    <div className="App">
      <Home botId = {BotId}/>
    </div>
    </div>
    </div>
    </>
  );
}

export default App;
