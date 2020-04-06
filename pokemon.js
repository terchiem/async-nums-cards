const BASE_URL =  "https://pokeapi.co/api/v2/";


async function getRandomPokemon(){
  let requestArray = [];
  for (let i = 0; i < 3; i++) {
    let randomNum = Math.floor(Math.random() * 807);
    requestArray.push(axios.get(`${BASE_URL}pokemon/${randomNum}`),
    );
  }
  let response = await Promise.all(requestArray);

  let responseSpecies = await Promise.all([
    axios.get(response[0].data.species.url),
    axios.get(response[1].data.species.url),
    axios.get(response[2].data.species.url)
  ]);

  // collect names
  let pokemonNames = response.map(pokemon => pokemon.data.name);

  // collect english flavor text
  let pokemonText = responseSpecies.map((resp) => {
    let englishText = resp.data.flavor_text_entries.find(entry => entry.language.name === "en")
    return englishText.flavor_text;
  });

  // collect pokemon sprites
  let pokemonImages = response.map(pokemon => pokemon.data.sprites.front_default);

  console.log(pokemonNames);
  console.log(pokemonText);
  console.log(pokemonImages);

  // append to results div
  for (let i = 0; i < 3; i++) {
    let pokemonHTML = createPokemonHTML(pokemonNames[i], pokemonText[i], pokemonImages[i]);
    $('#results').append(pokemonHTML);
  }
}

function createPokemonHTML(name, flavorText, img) {
  return $(`
    <div>
      <h3>${name}</h3>
      <img src="${img}"></img>
      <p>${flavorText}</p>
    </div>
  `)
}


$('#pokemon-btn').on('click', getRandomPokemon);