import logo from './logo.svg';
import './App.css';
import Styled from 'styled-components';
import Home from './components/Home'

const AppHeader = Styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  //background-color: crimson;
  border-bottom : 1px solid black;
  padding: 10px;
`;

function App() {
  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap", width:"100%"}}>
    <div style={{width:"10%", backgroundColor:"blue"}}>
    </div>
    <div style={{width:"90%"}}>
    <AppHeader>
      <div>
      <select id="selectBotId">
      <option value="">botId</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="1010">1010</option>
      <option value="10">10</option>
      <option value="">2</option>
      <option value="">25</option>
      <option value="">23</option>
      </select>
      </div>
      <div>
        <p>Gamut Analytics</p>
      </div>
    </AppHeader>
    <div className="App">
      <Home/>
    </div>
    </div>
    </div>
    </>
  );
}

export default App;
