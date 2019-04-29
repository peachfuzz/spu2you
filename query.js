<!DOCTYPE html>
<html>
<body>

<button onclick="checkDate()">Confirm Date</button>

<script>
function checkDate(){
var str;
var res;
}
// i need to check the format again but here are if statements for now that validate the string for correct months and days
// alert() for all values that are not correctly validated


//This function will validate the month coming from the string. It will get the month from the string and when i see the get element by id,it 
//will return null if there is nothing there. So then I will validate and look at the condition if it is not there, will return, then after// i will continue to validate it if it is in bounds with 1-12 month numbers and if  not will return.
function validateMonth(){
var month;
var d = new Date(); //gets new date this is just a placeholder until I confirm the formatting of how the user will type it in, after that i will 
//i will replace it with str.substr of wherever the date will be
month = d.GetMonth() + 1; //get month will change the string month into a numerical month
  
if(month < 1 || month > 12){ //if entered months are not valid month numbers
return;
}

//i believe we are changing the month back into a new month as well in this form after validation:
  // 1 Jan
  // 2 Feb
  // 3 Mar
  // 4 Apr
  // 5 May
  // 6 June
  // 7 Jul
  // 8 Aug
  // 9 Sep
  // 10 Oct
  // 11 Nov
  // 12 Dec
  var newMonth;
if(month == "1"){
  newMonth == "Jan";
}
  else if(month == "2"){
    newMonth == "Feb";
  }
  else if(month == "3"){
    newMonth == "Mar";
  }
  else if(month == "4"){
    newMonth == "Apr";
  }
  else if(month == "5"){
    newMonth == "May";
    else if(month == "6"){
      newMonth == "Jun";
    }
    else if(month == "7"){
      newMonth == "Jul";
    }
    else if(month == "8")
    {
      newMonth == "Aug";
    }
    else if(month == "9")
    {
      newMonth == "Sep";
    }
    else if(month == "10")
    {
      newMonth == "Oct";
    }
    else if(month == "11"){
      newMonth == "Nov";
    }
    else if(month == "12"){
      newMonth == "Dec";
    }
</script>

</body>
</html>
