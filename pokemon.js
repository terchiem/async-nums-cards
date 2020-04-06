const BASE_URL =  "https://pokeapi.co/api/v2/";


async function getRandomPokemon(){
  let requestArray = [];
  for (let i = 0; i < 3; i++) {
    let randomNum = Math.floor(Math.random() * 807);
    requestArray.push(axios.get(`${BASE_URL}pokemon/${randomNum}`),
    );
  }
  let response = await Promise.all(requestArray);
  let pokemon1 = response[0].data.name;
  let pokemon2 = response[1].data.name;
  let pokemon3 = response[2].data.name;

  let responseSpecies = await Promise.all([
    axios.get(response[0].data.species.url),
    axios.get(response[1].data.species.url),
    axios.get(response[2].data.species.url)

  ]);
  
  let pokemon1Text =  responseSpecies[0].data.flavor_text_entries.find(function(entry){
    return entry.language.name === "en";

  });

  let pokemon2Text =  responseSpecies[1].data.flavor_text_entries.find(function(entry){
    return entry.language.name === "en";

  });

  let pokemon3Text =  responseSpecies[2].data.flavor_text_entries.find(function(entry){
    return entry.language.name === "en";

  });
 

  console.log(pokemon1,pokemon1Text.flavor_text);
  console.log(pokemon2,pokemon2Text.flavor_text);
  console.log(pokemon3,pokemon3Text.flavor_text);




   

}
