$(shuffleDeck)
let deckOfCards;

async function shuffleDeck(){

  let response = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
  deckOfCards = response.data.deck_id;
  return response.data;

}


async function drawCardOne(){

  if (!deckOfCards){
   await shuffleDeck();
  }

  let response = await Promise.all([
    axios.get(`https://deckofcardsapi.com/api/deck/${deckOfCards}/draw/?count=1`),
    axios.get(`https://deckofcardsapi.com/api/deck/${deckOfCards}/draw/?count=1`)
  ]);
  // console.log(response);
  console.log(response[0].data.cards[0].value, response[0].data.cards[0].suit);
  console.log(response[1].data.cards[0].value, response[1].data.cards[0].suit);

}



async function drawCardHTML(){

   let response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckOfCards}/draw/?count=1`);
   let cardImage = response.data.cards[0].image;
   let randomNum = Math.floor(Math.random() * 360);

   $("#result").append($(`<img style="transform:rotate(${randomNum}deg)"class="card" src="${cardImage}"></img>`));
   console.log(response.data.cards[0].value, response.data.cards[0].suit);

}











$("#get-card").on("click",drawCardHTML)