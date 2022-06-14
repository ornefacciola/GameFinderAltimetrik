//GET https://api.rawg.io/api/platforms?key=515c56ee66b645f3b3bb5c834fb521eb
//GET https://api.rawg.io/api/games?key=515c56ee66b645f3b3bb5c834fb521eb&dates=2019-09-01,2019-09-30&platforms=18,1,7

let pageNumber= 1;
function fetchGames() {
    const url= 'https://api.rawg.io/api/platforms?key=515c56ee66b645f3b3bb5c834fb521eb'
    
    return fetch(url)
    .then(response => {return response.json() })
    .then(data => {
        console.log(data)
        generalStore=data.results
        const gamesId= data.results.map(g => g.id) //list of all the IDs of all games
        const gamePromises = gamesId.map(fetchGame) //list of promises of each game
        return Promise.all(gamePromises) //new promise that resolves a list of games
    })
}
fetchGames()

getCards()

function getCards() {
    const prom = fetchGames(pageNumber)
    prom.then(games => {
        gamesStore=games
        console.log(games);
        renderCards(games);
        renderSingleCard(games)

    })
}

function fetchTrailer(gameId) {
    const url = 'https://api.rawg.io/api/games/${gameId}/movies?key=515c56ee66b645f3b3bb5c834fb521eb'
}



