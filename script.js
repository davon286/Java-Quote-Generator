const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];

//Show Loading circle
function loading (){
  loader.hidden = false;
  quoteContainer.hidden = true;

}

//Hide Loading

function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Show new quote
function newQuote(){
  loading();
  //Pick a random quote from ApiQuotes array
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];

  //Check If Author field is blank and replace it with unknown
if(!quote.author){
  authorText.textContent = 'Unknown';
} else{
  authorText.textContent = quote.author;
}
//Check quote length to determine the styling

if(quote.text.length > 120){
  quoteText.classList.add('long-quote');
 } else{
  quoteText.classList.remove('long-quote');
 }
//Set Quote, Hide Loader


quoteText.textContent = quote.text;
complete();
}

//Get quotes from API
async function getQuotes() {
  loading();
  const apiURL = 'https://type.fit/api/quotes';
  try{
 const response = await fetch(apiURL);
 apiQuotes = await response.json();
 newQuote();
  }
  catch (error){
    // Catch error Here
    alert(error);
  }
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);

//On Load
getQuotes();
