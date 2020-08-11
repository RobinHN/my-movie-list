(function () {

  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.getElementById('data-panel')
  const genresList = document.getElementById('genres-list')
  const genres = {
    "1": "Action",
    "2": "Adventure",
    "3": "Animation",
    "4": "Comedy",
    "5": "Crime",
    "6": "Documentary",
    "7": "Drama",
    "8": "Family",
    "9": "Fantasy",
    "10": "History",
    "11": "Horror",
    "12": "Music",
    "13": "Mystery",
    "14": "Romance",
    "15": "Science Fiction",
    "16": "TV Movie",
    "17": "Thriller",
    "18": "War",
    "19": "Western"
  }
  const allGenres = Object.values(genres)

  let navHtml = ''
  for (i = 1; i < 20; i++) {
    navHtml += `
      <li class="nav-item">
        <a class="nav-link border border-muted" data-toggle="pill" href="#" role="tab">${genres[i]}</a>
      </li>`
  }
  genresList.innerHTML = navHtml



  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    displayMovies(data)
    console.log(data)
  }).catch((err) => console.log(err))

  genresList.addEventListener('click', event => {
    if (event.target.matches('.nav-link')) {
      let targetGenres = event.target.innerHTML
      //console.log(targetGenres)
      let matchGenres = allGenres.indexOf(targetGenres) + 1

      let results = data.filter(
        movie => movie.genres.includes(matchGenres)
      )
      console.log(results)
      displayMovies(results)
    }
  })

  function displayMovies(data) {
    let htmlContent = ''
    data.forEach(function (item, index) {
      htmlContent += `
      <div  class="col-sm-3">
        <div class="card mb-2">
          <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
          <div class="card-body movie-item-body">
            <h6 class="card-title no-wrap">${item.title}</h5>
          </div>
          <div class="card-footer bg-white">
      `
      let arrayGenres = item.genres.sort((a, b) => a - b)
      for (let element of arrayGenres) {
        htmlContent += `
            <small class="bg-light text-dark text-nowrap">${allGenres[element - 1]}</small>
      `
      }
      
      htmlContent += `
          </div>
        </div>
      </div>
      `

    })
    dataPanel.innerHTML = htmlContent
  }
})()
