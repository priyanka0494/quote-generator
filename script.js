const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}

function removeLoadingSpinner() {
	if (!loader.hidden) {
		loader.hidden = true;
		quoteContainer.hidden = false;
	}
}

function getNewQuote(apiQuote) {
	//pick random quote from apiQuote array
	const quote = apiQuote[Math.floor(Math.random() * apiQuote.length)];

	authorText.innerText = quote['author'] === '' ? 'Unknown' : quote['author'];

	//Reduce size for long quotes
	if (quote['text'].length > 120) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}

	quoteText.innerText = quote['text'];
}

async function getQuoteFromApi() {
	showLoadingSpinner();
	const apiUrl = "https://type.fit/api/quotes";
	try {
		const response = await fetch(apiUrl);
		apiQuote = await response.json();
		getNewQuote(apiQuote);
	} catch (error) {
		console.log("whoops, no quote", error);
	}
	removeLoadingSpinner();
}

//Tweet Quote
function tweetQuote() {
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterUrl + '_blank');
}

//Event Listener
newQuoteBtn.addEventListener('click', getQuoteFromApi);
twitterBtn.addEventListener('click', tweetQuote);

//on Load
getQuoteFromApi();