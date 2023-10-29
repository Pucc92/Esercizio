const primaGen = 151;
var pokedex =  {};

window.onload = async function () {
    for (let i = 1; i <= primaGen; i++) {
        await getPokemon(i);
        let pokemon = document.createElement('div');
        pokemon.id = i;
        pokemon.innerText = i.toString() + " . " + pokedex[i]['name'].toUpperCase();
        pokemon.classList.add('nome-pokemon');
        document.querySelector('.lista-nomi').append(pokemon);
        
    }
    console.log(pokedex['name']);
};

async function getPokemon( num ) {

    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let risposta = await fetch(url);
    let pokemon = await risposta.json();
    console.log(pokemon);
    let nomePokemon = pokemon['name'];
    let tipoPokemon = pokemon['type'];
    let imgPokemon = pokemon['sprites']['front_default'];

    risposta = await fetch(pokemon['species']['url']);
    let descPokemon = await risposta.json();
    
    descPokemon = descPokemon['flavor_text_entries'][9]['flavor_text'];
    
    pokedex[num] = { 'name' : nomePokemon, 'img' : imgPokemon, 'types' : tipoPokemon, 'desc' : descPokemon };
    
console.log(pokedex);
}