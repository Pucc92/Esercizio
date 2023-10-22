fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')
.then(response => {
    return response.json()
})

.then(data => {
  
    const card1 = document.getElementById('card1');
    const innerCard = `<h2>${data.name}</h2>`
    card1.insertAdjacentHTML("afterbegin", innerCard);
               
})

.catch(err => {})

fetch('https://pokeapi.co/api/v2/pokemon/charmander')
    .then(response => {
        return response.json()
    })

    .then(data => {

        const card1 = document.getElementById('card2');
        const innerCard = `<h2>${data.name}</h2>`
        card1.insertAdjacentHTML("afterbegin", innerCard);

    })

    .catch(err => { })

fetch('https://pokeapi.co/api/v2/pokemon/squirtle')
    .then(response => {
        return response.json()
    })

    .then(data => {

        const card1 = document.getElementById('card3');
        const innerCard = `<h2>${data.name}</h2>`
        card1.insertAdjacentHTML("afterbegin", innerCard);

    })

    .catch(err => { })



