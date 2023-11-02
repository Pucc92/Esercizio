const primaGen = 151;
let pokedex = {};

window.onload =  async function() {

    for (let i = 1; i < primaGen; i++) {
        await ottieniPokemon(i);
        
        let pokemon = document.createElement('div');
        pokemon.id = i;
        pokemon.innerText = i.toString() + ' . ' + pokedex[i].nome.toUpperCase();
        pokemon.classList.add('nome-pokemon');
        document.querySelector('.lista-nomi').appendChild(pokemon);
        pokemon.addEventListener('click', aggiornaPokemon);
    }
    

}

async function ottieniPokemon(num) {
    let url = 'https://pokeapi.co/api/v2/pokemon/' + num.toString();
    let risposta = await fetch(url);
    let pokemon = await risposta.json();
    // console.log(pokemon);

    //Ottengo il nome del pokemon
    let nomePokemon = pokemon.name;
    // console.log(nomePokemon);
    //Ottengo l' immagine del pokemon
    let imgPokemon = pokemon.sprites.front_default;
    // console.log(imgPokemon);
    let tipoPokemon = pokemon.types;
    // console.log(tipoPokemon);
    //Ottengo descrizione pokemon
    risposta = await fetch(pokemon.species.url);
    let descPokemon = await risposta.json();
    descPokemon = descPokemon.flavor_text_entries[9].flavor_text;

    pokedex[num] = { 'nome': nomePokemon, 'img': imgPokemon, 'tipi': tipoPokemon, 'desc': descPokemon };
    // console.log(pokedex);
}

function aggiornaPokemon() {
    document.getElementById('pokemon-img').src = pokedex[this.id].img;

    
    //clear previous type
    let divPokemon = document.getElementById("pokemon-type");
    while (divPokemon.firstChild) {
        divPokemon.firstChild.remove();
    }

    let types = pokedex[this.id].tipi;
    console.log(types);
    types.forEach(tipo => {
        let boxTipi = document.createElement('span');
        boxTipi.innerText = tipo.type.name.toUpperCase();
        divPokemon.appendChild(boxTipi);
    });

    document.getElementById('pokemon-desc').innerText = pokedex[this.id].desc;
}