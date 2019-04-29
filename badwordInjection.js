var badWords = ['delete', 'insert', 'update', 'alter', 'select', 'drop', 'add'];
//creates an array of words that we dont want to have in our URL selection

var i;

//function to loop through bad words array in the url to inject
//will replace the words if in it
function badwordInjection(req){
  for(i = 0; badWords.length; i++){
    var scrub = req.query.date;
    scrub.replace(badWords[i], ""); 
  }
}
