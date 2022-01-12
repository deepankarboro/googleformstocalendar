var calendarId = "<Your calendar ID to be pasted here>";
var formTimeStampId = 1; //timestamp of the form submission
var userId = 2; //autologs the username based on google account
var leaveTypeId = 4; //Leave Type
var reasLeaveId = 5; //Reason for Leave
var startDtId = 6; //Start date and time
var endDtId = 7; //End date and time

function getLatestAndSubmitToCalendar() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var values = rows.getValues();
  var lr = rows.getLastRow();
  var startDt = sheet.getRange(lr,startDtId,1,1).getValue();
  var endDt = sheet.getRange(lr,endDtId,1,1).getValue();
  var userName = sheet.getRange(lr,userId,1,1).getValue();
  var subOn = "Submitted on: "+sheet.getRange(lr,formTimeStampId,1,1).getValue();
  var desc = sheet.getRange(lr,leaveTypeId,1,1).getValue()+"\n"+subOn+"\n" +"Added by: "+ userName+"\n"+sheet.getRange(lr,reasLeaveId,1,1).getValue();
  var title = sheet.getRange(lr,reasLeaveId,1,1).getValue()+sheet.getRange(lr,userId,1,1).getValue();
  createEvent(calendarId,userName,startDt,endDt,title,desc);
}

//You can use the below function to add form fields through script
/*function formfieldadd() {
  // Open a form by ID.
  var form = FormApp.openById('<Your form ID to be pasted here>');
  var item = form.addDateTimeItem();
  item.setTitle('Please add end leave date and time');
}*/

function createEvent(calendarId,userName,startDt,endDt,title,desc) {
  var cal = CalendarApp.getCalendarById(calendarId);
  var start = new Date(startDt);
  var end = new Date(endDt);
  var event = cal.createEvent(userName, start, end, {
    title : title,
    description : desc
      }
  );
};
