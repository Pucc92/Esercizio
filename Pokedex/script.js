// Creo una variabile con il numero della 1ª generazione di Pokémon (151 Pokémon in totale)
const primaGen = 151;
// Creo un oggetto vuoto chiamato pokedex per archiviare le informazioni sui Pokémon
var pokedex = {};

// Questo codice viene eseguito quando la pagina si è caricata completamente
window.onload = async function () {
    // Itero attraverso i numeri da 1 a 151 (Gen 1)
    for (let i = 1; i <= primaGen; i++) {
        // Chiamo la funzione getPokemon asincrona per ottenere informazioni su ciascun Pokémon
        await getPokemon(i);

        // Creo un elemento div per il Pokémon corrente
        let pokemon = document.createElement('div');
        // Imposto l'ID dell'elemento div come il numero del Pokémon
        pokemon.id = i;
        // Imposto il testo dell'elemento div con il numero del Pokémon e il nome del Pokémon in maiuscolo
        pokemon.innerText = i.toString() + " . " + pokedex[i]['name'].toUpperCase();
        // Aggiungo una classe 'nome-pokemon' all'elemento div
        pokemon.classList.add('nome-pokemon');
        // Aggiungo l'elemento div alla lista di nomi dei Pokémon
        document.querySelector('.lista-nomi').append(pokemon);
        // Aggiungo un evento click all'elemento div per mostrare le informazioni del Pokémon
        pokemon.addEventListener('click', cardPokemon);
    }
};

// Funzione asincrona per ottenere informazioni su un Pokémon dato il suo numero
async function getPokemon(num) {
    // Costruisco l'URL per ottenere le informazioni del Pokémon dalla PokeAPI
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();
    // Eseguo una richiesta asincrona per ottenere i dati del Pokémon
    let risposta = await fetch(url);
    let pokemon = await risposta.json();

    // Ottengo il nome, il tipo e l'immagine del Pokémon dai dati ricevuti
    let nomePokemon = pokemon['name'];
    let tipoPokemon = pokemon['types'];
    let imgPokemon = pokemon['sprites']['front_default'];

    // Eseguo una nuova richiesta asincrona per ottenere la descrizione del Pokémon
    risposta = await fetch(pokemon['species']['url']);
    let descPokemon = await risposta.json();

    // Estraggo la descrizione dal campo giusto nei dati
    descPokemon = descPokemon['flavor_text_entries'][9]['flavor_text'];

    // Aggiungo le informazioni del Pokémon all'oggetto pokedex usando il numero come chiave
    pokedex[num] = { 'name': nomePokemon, 'img': imgPokemon, 'types': tipoPokemon, 'desc': descPokemon };
}

// Funzione per mostrare le informazioni di un Pokémon quando viene cliccato
function cardPokemon() {
    // Imposto l'immagine del Pokémon nel tag con l'ID 'pokemon-img'
    document.getElementById('pokemon-img').src = pokedex[this.id]['img'];

    let typeContent = document.getElementById('pokemon-type');
    // Cancello i tipi precedenti
    let type = pokedex[this.id]['types'];
    console.log(type);
    for (let i = 0; i < type.length; i++) {
        // Aggiungo i tipi del Pokémon in maiuscolo
        typeContent.innerText = type[i]["type"]["name"].toUpperCase();
    }

    // Imposto la descrizione del Pokémon nel tag con l'ID 'pokemon-desc'
    document.getElementById('pokemon-desc').innerText = pokedex[this.id]['desc'];
}

