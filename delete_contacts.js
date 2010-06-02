//                           -*- Mode: Javascript -*- 
// delete_contacts.js --- 
// Author          : Balaji N
// Created On      : Wed Jun  2 18:15:00 2010
// Last Modified By: Balaji N
// Last Modified On: Wed Jun  2 18:53:08 2010
// Update Count    : 2
// Status          : Tested to work
// 

// Ovi does not provide a way to delete all the contacts. 
// This JS script provides a way to do this. 
// Go to the ovi contacts page, select list view and paste this script in firebug and run. 
// No error handling done.

 //load YUI libraries for connecton manager
 var s = document.createElement('script');
 s.setAttribute('src', 'http://yui.yahooapis.com/combo?2.8.1/build/yahoo/yahoo-min.js&2.8.1/build/event/event-min.js&2.8.1/build/connection/connection-min.js');
 document.body.appendChild(s);
 s.onload=function(){

	 function handleSuccess(object){
		 console.log(object.responseText);
	 }

	 function handleFailure(object){
		 console.log("Unable to submit data");
	 }

	 var callback = {
	 success:handleSuccess,
	 failure:handleFailure,
	 };

	 //URL for delete
	 var serverPath = 'http://contactsui.ovi.com/contacts/secure_html/delete_contact/';

	 //The mt key used in the request is the first parameter (separated by ^) of a cookie called CSessionId	
	 var mt = document.cookie.match(/CSessionId=([^^]*)/)[1];

	 function sendAjaxRequest(id){  
		 var postData = "id=" + id + "&mt=" + mt;  
		 var request = YAHOO.util.Connect.asyncRequest('POST',serverPath,callback,postData);
	 }

	 //Each contact has a hidden input element in each of the table rows.	
	 var headings = document.evaluate("//tr/td/input[@type='hidden']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
	 for (var i = 0; i < headings.snapshotLength; i++){
		 a = headings.snapshotItem(i); 
		 console.log("Value is %s", a.value); 
		 sendAjaxRequest(a.value);
	 } 

	 //var getURL = 'http://contactsui.ovi.com/contacts/secure_html/get_contacts/?view=l&size=100&start=0&sort=firstname&order=asc&mt=' + mt; 

	 //YAHOO.util.Connect.asyncRequest('GET',getURL,callback,'');
 };
 void(s);
