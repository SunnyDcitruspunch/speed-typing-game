const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

let isCorrect = true
quoteInputElement.addEventListener('input', () => {
  const arrQuote = quoteDisplayElement.querySelectorAll('span')
  const arrValue = quoteInputElement.value.split('')
  arrQuote.forEach((charSpan, index) => {
    const char = arrValue[index]
    if(char == null) {
      charSpan.classList.remove('correct')
      charSpan.classList.remove('incorrect')
      isCorrect = false
    } else if(char === charSpan.innerText) {
      charSpan.classList.remove('incorrect')
      charSpan.classList.add('correct')
      isCorrect = true
    } else {
      charSpan.classList.add('incorrect')
      charSpan.classList.remove('correct')
      isCorrect = false
    }
    console.log('isCorrect ', isCorrect)
  })

  if(isCorrect) {
    renderNewQuote()
  }
})

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const charSpan = document.createElement('span')
    charSpan.innerText = character
    quoteDisplayElement.appendChild(charSpan)
  });
  quoteInputElement.value = null
  startTimer()
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
      timerElement.innerText = getTimerTime()
    }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()
