import axios from "axios";
import react, {useState, useEffect,useRef} from "react";
import ReactDOM from 'react-dom';
import Styled from 'styled-components';
import { format, addDays, daysInWeek } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import ReactPaginate from 'react-paginate';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import ConvertTime from '../utils/sources/Fetched';
import '../utils/PaginationCss.css';
import Spinner from '../assets/spinner.gif';



const HomeMain = Styled.div`
    display: flex;
    flex-wrap : wrap;
    background-color: #fafafa;
    //margin-top : 10px;
`;
const SidebarHome = Styled.div`
    padding:10px;
    margin : 5px 1%;
    flex: 1 1 10%;
    min-width : 300px;
`;

const ChatArea = Styled.div`
    margin : 5px 1%;
    background-color:white;  
    flex: 1 1 50%;
    padding: 0 2%;
    height: 80vh;
    overflow-y: hidden;
    :hover{
        overflow: auto;

    }
`;
const ChatDiv = Styled.div`
    width : 100%;
    display:flex;
    //flex-wrap:wrap;
`;
const DumyDiv = Styled.div`
flex-shrink: 1;
flex-grow: 1;
//flex-basis:20%;
min-width:250px;
`;
const ClientChat = Styled.div`
 flex-shrink:1;
align-item:right;
 background-color: #0174ff !important;
 color: white !important;
 font-family: Lato;
 border-radius: 10px 10px 0 10px;
 font-size: 14px;
 Padding: 10px 7px;
 margin: 14px 0;
`;
const BotChat = Styled.div`
     text-align: left;
     align-item:left;
     flex-shrink:1;
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 14px;
    Padding: 10px 7px;
    margin:10px 0px;
    border-radius: 10px 10px 0 10px;
`;

const SearchInput = Styled.input`
    width: 90%;
    padding: 7px;
    border-radius: 10px;
    margin-top : 10px;
    margin-bottom: 10px;
    //border:none;
    outline: none;
`;
const HomeButton = Styled.button`
    padding 5px;
    border-radius:5px;
    margin: 0 5px;
    outline: none;
`;
const UserIdBox = Styled.div`
height : auto;
margin: 5px 0px;
border-radius : 5px;
`;

const DateAreaSpan = Styled.div`
    background-color:white;
    padding: 7px 25px;
    border-radius: 5px;
    color: black;
    font-size: 14px;
    margin: 0px 0px 10px 0px;
    backgroundColor: #ffffff;
    color: #1b1b1b;
`;




//var usersByDay={};
const BaseURL = "https://backend.saarthi.ai";
 //const queryfffUrl = "http://dashboard.saarthi.ai/Query 62/stream?format=json&token=shhh&params=botid:55|from_date:2021-08-17|to_date:2021-08-23";
//const queryUrl = "https://backend.saarthi.ai/humanHandoff/getUserHistory?userId=6009698071"

var queryUrlBase = "http://dashboard.saarthi.ai/Query 62/stream?format=json&token=shhh&params=";
var cnt =[];
var flagDate = true;
var chatDateType = Date(new Date());
const Home = (props) =>{
    const [sessionList,setSessionList] = useState([]);
    const [groupById , setGroupById] = useState({});
    const [filteredData, setFilteredData] = useState({});
   const [finalData, setFinalData] = useState([]);
   // setFilteredData({...filteredData});
    const [q, setQ] = useState('');
   // const cnt = 0;
    //const [idSelector, setIdSelector] = useState(null);
    const ref = useRef(null);
    const [offset, setOffset] = useState(0);
   const [errOccur, setErrOccur] = useState(null);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(20)

    const [chatHistoryData,setChatHistoryData] = useState({});
   // const [chatDateType , setChatDateType] = useState(new Date());
    const [ hideShow, setHideShow] = useState(false);
    const [ typeShow, setTypeShow] = useState(true);
    const [ classAdd , setAclassAdd] = useState({
        bgColorUser :"#0174ff",
        colorUser : 'white',
        bgColorSession : "",
        colorSession : "black",
        clickBgColor : "",
        clickColor : ""
    })

    const [ keyId,setKeyId] = useState('');
    const [dateState, setDateState] = useState([{
          startDate: addDays(new Date(), -7),
          endDate: new Date(),
          key: 'selection'
        }]);


        let queryUrl ='';
    const [dateToggle , setDateToggle] = useState(false);
    const HideAndShow = (k) =>{
         setHideShow(hideShow => !hideShow);
         setKeyId(k);
        // chatHistory(k, '');
    }
    // useEffect(()=>{
    //     HideAndShow(keyId);
    // }, [keyId])

    const [statusLoading, setStatusLoading] = useState('Loading');
    const [chatLoading, setChatLoading] = useState('Loading');


    const handleClickUser=(key)=>{
        if( key === 'user'){
        setTypeShow(true);
        setAclassAdd({
            ...classAdd,
            bgColorUser : "#0174ff",
            bgColorSession: "",
            colorSession: "",
            colorUser: "white"
        })
        }
        else{
            setTypeShow(false);
            setAclassAdd({
                ...classAdd,
                bgColorUser : "",
                bgColorSession: "#0174ff",
                colorSession: "white",
                colorUser:""
            })
        }
    }

    const handlePageClick = (e) => {
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage);
    };

    function objSlice(obj, offset, lastExclusive) {
        var filteredKeys = Object.keys(obj).slice(offset, lastExclusive);
        var newObj = {};
        filteredKeys.forEach(function(key){
            newObj[obj[key].user_id] = obj[key];
        });
        return newObj;
    }

    async function fetchId(){
        try{
            const res = await axios.get(queryUrl)
            const rawData = res.data;
            const usersByDay = {}; 
            //var j = 0          
        for (var i = 0; i < rawData.length; i++) {
            var item = rawData[i];
            //(usersByDay[item.user_id])
            (usersByDay[item.user_id] || (usersByDay[item.user_id] = [])).push(item);

        } 
       // console.log()      
        setGroupById(usersByDay);
        setFilteredData(usersByDay);
        var j = 1;
        const jai = usersByDay && Object.keys(usersByDay).map( k => {
            return k;
        });
        cnt = [...jai];
        setPageCount(Math.ceil(jai.length / perPage));
        setStatusLoading('Loaded');
        if( rawData.length ===0){
            setStatusLoading('No data found...');
            setChatLoading('No data found...');
        }
        //rawData[0].session_id
        else{
            chatHistory(rawData[0].user_id, rawData[0].session_id);
        }
        }
        catch(error){
            console.error(error);
            setStatusLoading('Error');
            setErrOccur(error.data);
        }
      }
      //window.addEventListener('scroll', this.handleScroll, true);
      const filtered = (e) => {
        const filtered =
          groupById &&
          Object.keys(groupById).filter((item) => {
            return item.startsWith(e);
          });
          setPageCount(Math.ceil(filtered.length / perPage));
          const jai = groupById;
              var filterByUserId = {};
            for (var i = 0; i < filtered.length; i++) {
                var itm = filtered[i];
                (filterByUserId[itm] || (filterByUserId[itm] = [])).push(...groupById[itm]);
            }         
        setFilteredData(filterByUserId);
        setOffset(0);
      };

      useEffect(() => {
        filtered(q);
      }, [q]);

 const dateFormater = (item) => {
         setDateState([item.selection]);
         setDateToggle(!dateToggle);
    }       

async function chatHistory(userIdSelected, sessionIdSelected) {   
    const id = sessionIdSelected;
    //console.log(id);
   // if(idSelector === null){
        // console.log('blank');
        // console.log(idSelector);
        // setIdSelector(id);
        // console.log(idSelector);
        // let element = document.getElementById(idSelector);
        // console.log(element);
        // ReactDOM.findDOMNode(element).classList.add("seleU") 
    //     const p = ref.current; // corresponding DOM node
    // p.className = "seleU";
    //}
    // else{
        
    //     let element = document.getElementById(idSelector);
    //    // console.log('blank');
    //    console.log(element);
    //    console.log(idSelector);
    //     ReactDOM.findDOMNode(element).classList.remove("selectedU");
    //     console.log('blank');
    //     setIdSelector(id);
    //     element = document.getElementById(idSelector);
    //     console.log(element);
    //     console.log(idSelector);
    //     ReactDOM.findDOMNode(element).classList.add("selectedU")
    // }
       

    setChatLoading('Loading');  
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
                 setChatLoading('Loaded');
            }
            catch(error){
                console.log(error)
                setChatLoading('Error');
            }
        }
 }
}

       
      useEffect(() => {
        const from_date = format( new Date(dateState[0].startDate) , 'yyyy-MM-dd');
        const to_date = format(new Date(dateState[0].endDate), 'yyyy-MM-dd');
        queryUrl = queryUrlBase +"botid:" + props.botId + "|from_date:" + from_date + "|to_date:" + to_date ;
        setStatusLoading('Loading');
        setChatLoading('Loading');
        fetchId();
        },[props.botId, dateState]);

const ram = "jai prakash";
const arr = [1,2,3,4,5,6,7,8,9,2,4,5,6,7,8,9,1,2,3,4,5];
    return(
        <>
        <HomeMain>
            <SidebarHome>
                <div style={{

                }}>      
                       <DateAreaSpan>
                        {dateState[0].startDate.toString().substring(3, 15)} &nbsp; - &nbsp;
                       {dateState[0].endDate.toString().substring(3, 15)} &nbsp;&nbsp;
                           <span onClick={ () => setDateToggle(!dateToggle)}>
                        {
                        (!dateToggle) ? (<i style={{cursor:"pointer"}} class="fas fa-calendar-alt"></i>) : (<></>)
                        }
                         </span>
                       </DateAreaSpan> 
                       <div style={{backgroundColor:"white", width:"250px"}}>
                           {
                             (dateToggle) && <DateRangePicker
                             style={{backgroundColor:"white", width:"250px", zIndex:"1000"}}
                               onChange={(item) => dateFormater(item)}
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
                <div style={{backgroundColor:"white",marginBottom:"20px", paddingBottom:"10px"}}>
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
                <HomeButton style={{ cursor:"pointer", backgroundColor: classAdd.bgColorUser, color: classAdd.colorUser}} 
                onClick={() => handleClickUser('user')}> UserId / Phone-NO</HomeButton>
                <HomeButton style={{ cursor:"pointer", backgroundColor: classAdd.bgColorSession , color: classAdd.colorSession}} 
                onClick={() => handleClickUser('session')}>Session Id</HomeButton>
                </div>
                </div>
                <div className="myscrollbar">
                    
                    {
                        (statusLoading === 'Loaded') &&
                     (typeShow) &&  Object.keys(filteredData).slice(offset,offset + perPage).map((k) => {
                        return (
                            <>
                        <UserIdBox>

                            <div key={k} className="userIdArea"
                             onClick={() => HideAndShow(k)} 
                             >
                                 {cnt.indexOf(k)+1}.  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;{k}
                                 </div>
                            {
                               (keyId ===k) ?(filteredData[k].map( (item) => {
                                    return <p id={item.session_id} key={item.session_id} className="sessionIdArea"
                                    onClick={() => chatHistory(k,item.session_id)}
                                    >{item.session_id}</p>
                                })):(<></>)
                            }  
                        </UserIdBox>
                        </>
                        )
                    })
                }
                {/* {
                     (statusLoading === 'Loading')&&
                     <p> <img style={{width:"50px"}} src={Spinner}/> Loading data... </p>
                } */}
                {
                    (statusLoading === 'Error') &&
                    (<p>{errOccur}</p>)
                }
                {
                    (statusLoading === 'No data found...') &&
                    (<p></p>)
                }
                </div>
                <div className="myscrollbar">
                    {
                     Object.keys(filteredData).slice(offset,offset + perPage).map(k => {
                        return (
                            <>
                        <UserIdBox>
                            {
                               (!typeShow) && (filteredData[k].map( (item) => {
                                    return <p id={item.session_id} className="sessionIdArea" ref={ref}
                                    onClick={() => chatHistory(k,item.session_id)}
                                    >{item.session_id}</p>
                                }))
                            }
                        </UserIdBox>
                        </>
                        )
                    })
                    }
                </div>
                <div>
                    {
                (statusLoading==='Loaded') && 
                (statusLoading!=='Loading') && 
                (statusLoading !=='No data found...') && 
                (pageCount !==0) && <ReactPaginate
                    previousLabel={"<<"}
                    nextLabel={">>"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                }
                </div>
                
            </SidebarHome>
            <ChatArea>
            <p>{chatDateType.toString().substring(0,15)}</p>
        {
           (chatLoading === 'Loaded') && Object.keys(chatHistoryData).map( (k) =>{
                const messageType = chatHistoryData[k].msg_type;
                var datetype = new Date(chatHistoryData[k].created_at) || "";
                datetype = ConvertTime(datetype);
                chatDateType = datetype;
                datetype = datetype.slice(15,24);
                if(messageType === 0){
                    var text1 = chatHistoryData[k].text;
                    return(
                        <>
                        <ChatDiv>
                        <DumyDiv></DumyDiv>
                        <ClientChat key={k}>   
                            <p style={{textAlign:"left",padding:"0px",margin:"0px"}}>{text1}</p>
                            <p style={{textAlign:"right", fontSize:"10px",padding:"0px",margin:"0px"}}>{datetype}</p>
                        </ClientChat>
                        </ChatDiv>
                        </>
                    )
                }
                 if(messageType === 1){
                   const botUtterdRes = chatHistoryData[k].text.data;
                   const userIntent = chatHistoryData[k].text.nlu_data.intent.name;
                   const userIntentConf = chatHistoryData[k].text.nlu_data.intent.confidence;
                   const botCustomStatus = chatHistoryData[k].text.custom.status;
                    return(
                        <>
                        <ChatDiv>
                        <DumyDiv></DumyDiv>
                        <div style={{
                        // backgroundColor:"#0174ff",
                        backgroundColor:"rgba(1,116,255,0.7)",
                        borderRadius: "5px 5px 0 5px",
                        wordWrap: "break-word",
                        color:"white",
                        padding:"5px 10px"
                        }}>
                        <p style={{fontSize:"10px", padding:"0px",margin:"0px"}}>{userIntent}: &nbsp;{(Math.round(userIntentConf * 100) / 100).toFixed(2)*100}%,&nbsp;Status: {botCustomStatus}</p>
                        </div>
                        </ChatDiv>
                        {
                             Object.keys(botUtterdRes).map( (kk) =>{
                                var text2 = botUtterdRes[kk].text;
                                var j =k+kk;
                                return(
                                    <>
                                    <ChatDiv>  
                                    <BotChat key={j}>
                                    <p style={{textAlign:"left",padding:"0px",margin:"0px"}}>{text2}</p>
                                    <p style={{textAlign:"right",fontSize:"10px",padding:"0px",margin:"0px"}}>{datetype}</p> 
                                    </BotChat>
                                    <DumyDiv></DumyDiv>
                                    </ChatDiv>
                                    </>
                                )
                            })
                        }
                        </>
                    )   
                }   
           })
         }
          {
        (chatLoading === 'Loading')&&
         <p> <img style={{width:"50px"}} src={Spinner}/> Loading data... </p>
        }
        {
            (chatLoading === 'Error' || statusLoading ==='Error') &&
            (<p>{errOccur}</p>)
        } 
        {
            (chatLoading === 'No data found...') &&
            (<p>No data found in bot</p>)
         }
            </ChatArea>
        </HomeMain>
        </>
    )

}
export default Home;