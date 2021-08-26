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
    if (hour < 12) {
    datetypone = datetypone + " am"
    }
    else if (hour > 12) {
    hour = hour - 12;
    var minute = datetype.slice(18, 21);
    datetypone = hour + minute + " pm"
    }
    else {
    datetypone = datetypone + " pm"
    }
    }
    else {
    datetypone = datetype.slice(0, 21)
    var hour = datetype.slice(15, 18);
    if (hour < 12) {
    datetypone = datetypone + " am"
    }
    else if (hour > 12) {
    hour = hour - 12;
    var minute = datetype.slice(18, 21);
    var date_msg = datetype.slice(0, 15);
    datetypone = date_msg + " " + hour + minute + " pm";
    }
    else {
    datetypone = datetypone + " pm";
    }
    }
    } else {
    datetypone = "";
    }
    return(datetypone);
}

export default ConvertTime;