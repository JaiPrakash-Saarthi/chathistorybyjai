import react from 'react';

function ConvertTime(originalDate){
        
    var datetype = originalDate.toString();
    var datetypone = "";
    if (datetype != "") {
    var datetoday = Date(new Date());
    datetoday = datetoday.toString();
    datetoday = datetoday.slice(0, 15);
    var datetype_now = datetype.slice(0, 15)
    
    if (datetoday == datetype_now) {
    datetypone = datetype.slice(15, 21)
    var hour = datetype.slice(15, 18);
        //hour = hour + 5;
    if (hour < 12) {
    datetypone = datetypone + " AM"
    }
    else if (hour > 12) {
    hour = hour - 12;
    var minute = datetype.slice(18, 21);
    // minute = minute + 30;
    // if( minute >= 60 ){
    //     minute = minute -60;
    //     hour = hour + 1;
    // }
    datetypone = hour + minute + " PM"
    }
    else {
    datetypone = datetypone + " PM"
    }
    }
    else {
    datetypone = datetype.slice(0, 21)
    var hour = datetype.slice(15, 18);
    //hour = hour + 5;
    if (hour < 12) {
    datetypone = datetypone + " AM"
    }
    else if (hour > 12) {
    hour = hour - 12;
    var minute = datetype.slice(18, 21);
    // minute = minute + 30;
    // if( minute >= 60 ){
    //     minute = minute -60;
    //     hour = hour + 1;
    // }
    var date_msg = datetype.slice(0, 15);
    datetypone = date_msg + " " + hour + minute + " PM";
    }
    else {
    datetypone = datetypone + " PM";
    }
    }
    } else {
    datetypone = "";
    }
    return(datetypone);
}

// function DateFormate( originalDate){
//     from_date = originalDate.format('YYYY-MM-DD')
//     to_date = end.format('YYYY-MM-DD')
// }

export default ConvertTime;