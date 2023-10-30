// DOM Manipulation
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading function, show loading
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show new quote function
const newQuote = () => {
    loading();
    // Random quote from APIQUOTES array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is blank and replace it with 'unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote-length to determine a different styling
    if (quote.text.length > 100) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
// Set Quote, Hide loader
    quoteText.textContent = quote.text;
    complete();
};

// Get quotes from API
const getQuotes = async () => {
    loading();
    const APIURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        // Wont be populated until we have the data from the API url
        const response = await fetch(APIURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (err) {
        // Error handling
    }
};

// To tweet a quote
const tweetQuote = () => {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
};

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// When the page loads
getQuotes();
