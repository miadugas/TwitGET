//declare variables, assign to empty values
var keyword = " ";
// var country = $('#country').val();
var record = 0;
var startDate = ' ';
var endDate = ' ';



//event listener to listen for the search button
$('#search').on("click", function(){
  //on submit, get the values from each input
  var keyword = $('#searchTerm').val();
  // var country = $('#country').val();
  var record = $('#numRecords').val();
  var startDate = $('#startYear').val();
  var endDate = $('#endYear').val();
  // var country = $('#country').val();

  // var topHeadlines = $('#topHeadlines').val(); 
  







  //if the start date is equal to 0 (the default state) then save the query URL variable without the date peramters
  if (startDate.length === 0 && endDate.length === 0){
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&api-key=TN6ESlVHihs1cAhsZMjpUi7oMfaZKOUs";
    // api-key=dab836f7fc564992bdeeaa2c82581978"
  }else{
    //else which assumes it has the start and end date, set the query URL to equal with the date perameters
    queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + keyword + "&begin_date=" + startDate + "0101&end_date=" + endDate + "0101&api-key=TN6ESlVHihs1cAhsZMjpUi7oMfaZKOUs";
  }
//AJAX Call
  $.ajax({
    //the url is based on the if condition (with or without the date)
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //save the initial results full object as a variable. this specific API has an additional response, so it is tapping into the object itself here

//AJAX Call for News API
// var url = 'https://newsapi.org/v2/top-headlines?' +
//           'country=us&' +
//           'apiKey=dab836f7fc564992bdeeaa2c82581978';
// var req = new Request(url);
// fetch(req)
//     .then(function(response) {
//         console.log(response.json());
//     })








    var results = response.response;
    //run a for loop. while i is less than the amount of records the user requested
    for (var i = 0; i < record; i++){
      //the headline equals the results headline, abstract, url etc.
      var headline = $('<h1>'+results.docs[i].headline.main + '</h1>');
      var abstract = $('<p>'+results.docs[i].abstract + '</p>');
      var url = $('<a href=' + results.docs[i].web_url + '>Link to Article</a>');
      $('#topArticles').append(headline, abstract, url);
    }
});
});

