import ajax from '@alipay/ajax';
import {message} from 'antd';
function getData(url,data,callback,errorCallback){
    ajax({
      url:url,
      dataType: 'jsonp',
      jsonp: '_callback',
      data: data,
      success: (d) => {
        callback(d);
      },
      error:()=>{
      	if(errorCallback){
      		errorCallback();
      	}else{
          message.error("error");
        }
      }
  });
};
function changeDateToString(datetime,showTime){
   var time;
   var year = datetime.getFullYear();
   var month = datetime.getMonth()+1;//js从0开始取 
   var date = datetime.getDate(); 
   var hour = datetime.getHours(); 
   var minutes = datetime.getMinutes(); 
   var second = datetime.getSeconds();
   if(month<10){
    month = "0" + month;
   }
   if(date<10){
    date = "0" + date;
   }
   if(showTime){
       if(hour <10){
      hour = "0" + hour;
     }
     if(minutes <10){
      minutes = "0" + minutes;
     }
     if(second <10){
      second = "0" + second ;
     }
     time = year+"-"+month+"-"+date+" "+hour+":"+minutes+":"+second;
   }else{
       time = year+"-"+month+"-"+date;
   }
   return time;
};
export default {
  ajax:getData,
  changeDateToString:changeDateToString
};