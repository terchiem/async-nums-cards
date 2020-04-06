


$('#number-form').on('submit', handleSubmit)
$('#fav-number-form').on('submit', handleFavSubmit);


async function handleSubmit(evt) {
  evt.preventDefault();

  // get number from input
  let number1 = $('#number1').val();
  let number2 = $('#number2').val();
  let number3 = $('#number3').val();

  // make request
  let response = await axios.get(`http://numbersapi.com/${number1},${number2},${number3}?json`);

  // append number fact to body
  for (let fact in response.data) {
    $('#results').append($(`<p>${response.data[fact].text}</p>`));
  }

}

async function handleFavSubmit(evt) {
  evt.preventDefault();
  console.log('test');

  // get number
  let favNumber = $('#fav-number').val();

  // make all requests
  let responseList = await Promise.all([
    axios.get(`http://numbersapi.com/${favNumber}?json`),
    axios.get(`http://numbersapi.com/${favNumber}?json`),
    axios.get(`http://numbersapi.com/${favNumber}?json`),
    axios.get(`http://numbersapi.com/${favNumber}?json`)
  ]);

  // append each fact to body
  for (let response of responseList) {
    $('#results').append($(`<p>${response.data.text}</p>`));
  }

}

