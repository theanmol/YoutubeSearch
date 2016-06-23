var suggestions = [];
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    
    
   // suggestions=[];
   
    //sending the request to get suggestions for given query
    var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) 
    {
      suggestions=[];
      var resp = xhttp.responseText;
   
      var l = resp.lastIndexOf(')');
      
      //console.log(resp);
      
      resp=resp.substring(19,l);
      
     // console.log(resp);
      var data = JSON.parse(resp);
     
    
  
      var i;
      for (i = 0; i < data[1].length; i++){ 
       //    console.log(data[1][i][0]);
           suggestions.push({ content: data[1][i][0], description: data[1][i][0]});
   
          
        }
   
       
  
    }
    
  };
  
   xhttp.open("GET", "http://suggestqueries.google.com/complete/search?callback=?hl=en&ds=yt&client=youtube&q="+text, true);
   xhttp.send();
  
     
        suggest(suggestions);
    
    
  });
  
  
  
  function navigate(url) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
    });
  }
  
  
  
  
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    console.log('inputEntered: ' + text);
    
     var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) 
    {
      
      var resp = xhttp.responseText;
   
       resp = JSON.parse(resp);
      console.log(resp["items"][0]["id"]["videoId"]);
     
     // var data = JSON.parse(resp);
    var videoID=resp["items"][0]["id"]["videoId"];
     navigate('https://www.youtube.com/watch?v='+videoID);
  
    }
    
  };
  
   xhttp.open("GET", "https://www.googleapis.com/youtube/v3/search?part=id&type=video&maxResults=1&q="+text+"&key=AIzaSyAzM6v5sBS8rzNff3tCIrk9mcGa2RiS9Zg", true);
   xhttp.send();
    
    
    
    
    //var popups = chrome.extension.getViews({type: "popup"});
    //console.log(popups);
   
     //navigate('https://www.youtube.com/results?search_query='+text);
  });
