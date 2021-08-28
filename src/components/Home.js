import axios from "axios";
import react, {useState, useEffect} from "react";
import Styled from 'styled-components';
import { format, addDays } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ConvertTime from '../utils/sources/Fetched';


const HomeMain = Styled.div`
    display: flex;
    flex-wrap : wrap;
`;
const SidebarHome = Styled.div`
    padding:10px;
    border-right : 1px solid black;
    flex: 1 1 15%;
    min-width : 300px;
    //text-align: center;
`;

const ChatArea = Styled.div`
    flex: 1 1 60%;
    padding: 0 2%;
`;
const ClientChat = Styled.div`
text-align: right;

`;
const BotChat = Styled.div`
    text-align: left;
`;

const SearchInput = Styled.input`
    width: 90%;
    padding: 7px;
    border-radius: 10px;
    margin-top : 20px;
    margin-bottom: 5px;
`;
const HomeButton = Styled.button`
    padding 5px;
    border-radius:5px;
    margin: 0 5px
`;
const UserIdBox = Styled.div`
height : auto;
margin: 5px 0px;
padding:10px;
border-radius : 5px;
border : 1px solid blue;
`;

const DateAreaSpan = Styled.span`
    padding: 7px 25px;
    border-radius: 5px;
    box-shadow: 5px 5px 20px red inset;
    color: black;
`;




//var usersByDay={};
const BaseURL = "https://backend.saarthi.ai";
 const queryfffUrl = "http://dashboard.saarthi.ai/Query 62/stream?format=json&token=shhh&params=botid:55|from_date:2021-08-17|to_date:2021-08-23";
//const queryUrl = "https://backend.saarthi.ai/humanHandoff/getUserHistory?userId=6009698071"

var queryUrlBase = "http://dashboard.saarthi.ai/Query 62/stream?format=json&token=shhh&params=";

const Home = (props) =>{
    const [sessionList,setSessionList] = useState([]);
    const [groupById , setGroupById] = useState({});
    const [filteredData, setFilteredData] = useState({});
    const [q, setQ] = useState('');

    const [chatHistoryData,setChatHistoryData] = useState({});
    var cnt =0;
    const [ hideShow, setHideShow] = useState(false);
    const [ keyId,setKeyId] = useState('');
    const [dateState, setDateState] = useState([{
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection'
        }]);


        let queryUrl ='';
    const [dateToggle , setDateToggle] = useState(false);
    const HideAndShow = (k) =>{
         setHideShow(hideShow => !hideShow);
         setKeyId(k);
    }


    async function fetchId(){
        try{
            const value = await axios.get(queryUrl)
            const rawData = value.data;
            const usersByDay = {};
        for (var i = 0; i < rawData.length; i++) {
            var item = rawData[i];
            (usersByDay[item.user_id] || (usersByDay[item.user_id] = [])).push(item);
        }
            setGroupById(usersByDay);
           setFilteredData(usersByDay);
        }
        catch(error){
            console.error(error);
        }
      }

      const filtered = (e) => {
        const filtered =
          groupById &&
          Object.keys(groupById).filter((item) => {
            return item.startsWith(e);
          });
          const jai = groupById;
           console.log(jai);
              var filterByUserId = {};
            for (var i = 0; i < filtered.length; i++) {
                var itm = filtered[i];
                (filterByUserId[itm] || (filterByUserId[itm] = [])).push(...groupById[itm]);
            }         
          //console.log(filterByUserId);
        setFilteredData(filterByUserId);
      };

      useEffect(() => {
        filtered(q);
      }, [q]);

 const dateFormater = () => {
        const from_date = format( new Date(dateState[0].startDate) , 'yyyy-MM-dd');
        const to_date = format(new Date(dateState[0].endDate), 'yyyy-MM-dd');
         queryUrl = queryUrlBase +"botid:" + props.botId + "|from_date:" + from_date + "|to_date:" + to_date ;
        fetchId();
    }



async function chatHistory(userIdSelected, sessionIdSelected) {     
       const urlParamsHasUserId= userIdSelected!=""
        const urlParamsHasSessionId=sessionIdSelected!=""
        
        if (urlParamsHasUserId){
        var getUserID=userIdSelected;
          var getSessionId = ""
          var url_ext ='';
        if (urlParamsHasSessionId){
        getSessionId=sessionIdSelected;
          url_ext = "userId=" + getUserID + "&sessionId=" + getSessionId 
        } 
        else {
          url_ext = "userId=" + getUserID
        }
        var data = null;
        if (getUserID === null) {
        return false;
        } else {
            try{
                const chatHistorydataa = await axios.get( BaseURL + "/humanHandoff/getUserHistory?" + url_ext);
                 data = chatHistorydataa.data;
                 setChatHistoryData(data);
            }
            catch(error){
                console.log(error)
            }
        }
 }
}
       
      useEffect(() => {
        fetchId();
       // chatHistory('6009698071','6009698071-ameyo-1629369064422');
        }, []);

//console.log(sessionList);
const ram = "jai prakash";
const arr = [1,2,3,4,5,6,7,8,9,2,4,5,6,7,8,9,1,2,3,4,5];
    return(
        <>
        <HomeMain>
            <SidebarHome>
                <div>      
                       <DateAreaSpan>
                        {dateState[0].startDate.toString().substring(3, 15)} &nbsp; - &nbsp;
                       {dateState[0].endDate.toString().substring(3, 15)} &nbsp;&nbsp;
                       <span onClick={ () => setDateToggle(!dateToggle)}>
                           {
                               (dateToggle) ? (<i onClick={dateFormater} class="far fa-calendar-check"></i>) : (<i class="fas fa-calendar-alt"></i>)
                           }
                       </span>
                       </DateAreaSpan> 
                       <div>
                           {
                             (dateToggle) && <DateRangePicker
                               onChange={item => setDateState([item.selection])}
                               showSelectionPreview={false}
                               //disabled={true}
                              moveRangeOnFirstSelection={false}
                               months={2}
                               //fixedWidth={true}
                               ranges={dateState}
                               direction="horizontal"
                               />
                           }
                    
                    </div>
                </div>
                <div>
                <SearchInput 
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    value={q}
                    onChange={(e) => {
                    setQ(e.target.value);
                    }}
                />
                <div>
                <HomeButton>UserId / Phone-NO</HomeButton>
                <HomeButton>Session Id</HomeButton>
                </div>
                </div>
                <div>
                    {
                      Object.keys(filteredData).map(k => {
                        return (
                            <>
                        <UserIdBox>
                            <div key={k}
                            style={{
                                backgroundColor:"crimson",
                                padding:"10px 0px",
                                // color:"white"
                            }}
                             onClick={() => HideAndShow(k)}>{k}</div>
                            {
                               (hideShow) && (keyId ===k) ?(filteredData[k].map( (item) => {
                                    return <p 
                                    style={{
                                        border:"1px solid yellow",
                                        padding: "5px"
                                    }}
                                    onClick={() => chatHistory(k,item.session_id)}
                                    >{item.session_id}</p>
                                })):(<></>)
                            }
                        </UserIdBox>
                        </>
                        )
                    })
                    
                    }
                </div>
            </SidebarHome>
            <ChatArea>
        {
            Object.keys(chatHistoryData).map( (k) =>{
                const messageType = chatHistoryData[k].msg_type;
                var datetype = new Date(chatHistoryData[k].created_at) || "";
              
                datetype = ConvertTime(datetype);
                if(messageType === 0){
                    var text1 = chatHistoryData[k].text;
                    return(
                        <>
                        <ClientChat key={k}>   
                        <span>
                            {text1}
                            <br></br>
                            <small>{datetype}</small>
                        </span>
                        </ClientChat>
                        </>
                    )
                }
                 if(messageType === 1){
                   const botUtterdRes = chatHistoryData[k].text.data;
                    return(
                        <>
                        <BotChat>
                        {
                             Object.keys(botUtterdRes).map( (kk) =>{
                                var text2 = botUtterdRes[kk].text;
                                console.log(text2);
                                var j =k+kk;
                                return(
                                    <>
                                    <div key={j}>
                                    {text2}
                                    <br></br>
                                    {/* <small>{datetype}</small>
                                    <p></p> */}
                                    </div>
                                    </>
                                )
                            })
                        }
                        </BotChat>
                        </>
                    )   
                }   
            })
         }
            </ChatArea>
        </HomeMain>
        </>
    )

}
export default Home;