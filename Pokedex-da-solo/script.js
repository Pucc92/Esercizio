const primaGen = 151;
let pokedex = {};

window.onload = async function () {
  for (let i = 1; i < primaGen; i++) {
    await prendiPokemon(i);
    let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + " . " + pokedex[i].nome.toUpperCase();
    pokemon.classList.add("nome-pokemon");
    pokemon.addEventListener("click", caricaPokemon);
    document.querySelector(".lista-nomi").appendChild(pokemon);
  }
};

async function prendiPokemon(num) {
  let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
  let risposta = await fetch(url);
  let pokemon = await risposta.json();
  // console.log(pokemon);

  let nomePokemon = pokemon.name;
  let tipiPokemon = pokemon.types;

  let imgPokemon = pokemon.sprites.front_default;

  risposta = await fetch(pokemon.species.url);
  let descPokemon = await risposta.json();

  descPokemon = descPokemon.flavor_text_entries[9].flavor_text;
  // console.log(descPokemon);

  pokedex[num] = {
    nome: nomePokemon,
    img: imgPokemon,
    tipi: tipiPokemon,
    desc: descPokemon,
  };
}

function caricaPokemon() {
  document.getElementById("pokemon-img").src = pokedex[this.id].img;

  let parTipo = document.getElementById("pokemon-type");
  while (parTipo.firstChild) {
    parTipo.firstChild.remove();
  }
  let tipi = pokedex[this.id].tipi;

  tipi.forEach((tipo) => {
    let tipoBox = document.createElement("span");
    tipoBox.innerText = tipo.type.name.toUpperCase();
    parTipo.appendChild(tipoBox);
  });

  document.getElementById("pokemon-desc").innerText = pokedex[this.id].desc;
}
