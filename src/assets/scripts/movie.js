console.log('---------------- MOVIE ----------------');

var callbackSubmitButton = document.getElementById('callback-search');
var promiseSubmitButton = document.getElementById('promise-search');
var movieSubmitButton = document.getElementById('async-movie');
var searchObj = {};

// ------------------------ CALLBACK ------------------------

callbackSubmitButton.onsubmit = function (event) {
    event.preventDefault();

    searchObj = {
        title: encodeURI(event.target.elements.title.value),
        year: event.target.elements.year.value
    }

    fetchData(searchObj.title, searchObj.year, function (error, data) {
        if (error) {
            console.error('Error: ', error);
            document.getElementById('movie-list').textContent = 'Error fetching data';
        } else {
            console.error('Data: ', data);
            console.log(data);
            if (!data.Response) {
                document.getElementById('movie-list').textContent = JSON.stringify(data.Error, null, 2);
            } else {
                renderMovies(data.Search);
            }
        }
    });
}

function fetchData(title, year, callback) {
    const url = `http://www.omdbapi.com/?s=${title}&y=${year}&apikey=9606ae0f`;

    // fetch(`http://www.omdbapi.com/?s=${searchObj.title}&y=${searchObj.year}&apikey=9606ae0f`);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) { // A kérés befejeződött
            if (xhr.status === 200) { // A válasz státusza OK
                var data = JSON.parse(xhr.responseText);
                callback(null, data);
            } else {
                callback(new Error("Error fetching data"));
            }
        }
    };
    xhr.send();
}

// ------------------------ PROMISE ------------------------

promiseSubmitButton.onsubmit = function (event) {
    event.preventDefault();

    searchObj = {
        title: encodeURI(event.target.elements.title.value),
        year: event.target.elements.year.value
    }

    getData(searchObj.title, searchObj.year)
        .then((data) => {
            renderMovies(data.Search);
        })
        .catch((error) => {
            console.log(error);
        });
}

function getData(title, year) {
    return new Promise((resolve, reject) => {
        fetch(`http://www.omdbapi.com/?s=${title}&y=${year}&apikey=9606ae0f`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

// ------------------------ ASYNC ------------------------

movieSubmitButton.onsubmit = async (event) => {
    event.preventDefault();

    searchObj = {
        title: encodeURI(event.target.elements.title.value),
        year: event.target.elements.year.value
    }

    if (!searchObj.title || !searchObj.year) {
        alert('Hiányzik a cím, vagy az év!');
        return;
    }

    const response = await fetch(`http://www.omdbapi.com/?s=${searchObj.title}&y=${searchObj.year}&apikey=9606ae0f`);
    const movies = await response.json();

    // console.log('typeof getMovies:', typeof getMovies);
    // console.dir(getMovies);

    // var response = await getMovies(searchObj);
    // console.log('Resp: ', response);

    // var movies = await response.json();
    // console.log('Movies: ', movies);

    if (movies.Response === 'False') {
        alert(movies.Error);
        return;
    }
    renderMovies(movies.Search);
}

function getMovies(searchObj) {
    console.log('getMovies');
    return fetch(`http://www.omdbapi.com/?s=${searchObj.title}&y=${searchObj.year}&apikey=9606ae0f`);
}

function renderMovies(movies) {
    var list = document.getElementById('movie-list');

    list.innerHTML = '';

    movies.map(m => {
        var hasPoster = (m.Poster !== 'N/A');
        list.innerHTML +=
            `<div style="display: grid; width: min-content; grid-template-rows: auto 1fr;">
                <div>
                    ${hasPoster ? `<img src="${m.Poster}" style="max-width: 160px;">` : `<div style="height:240px; width: 162px; background: gray"></div>`}
                </div>
                <div style="display: grid; grid-template-rows: 1fr auto;">
                    <div>
                        <a href="https://imdb.com/title/${m.imdbID}" style="text-decoration: none; font-weight: bold" target="_blank">
                            ${m.Title}
                        </a> 
                        (${m.Year})
                    </div>
                    <div data-imdbid="${m.imdbID}" class="btn btn-outline-secondary movie-info-button" style="
                        text-align: CENTER;
                        cursor: pointer;
                        MARGIN-TOP: 10px;
                        border-radius: 5px;
                        border: 1px solid grey;">INFO</div>
                </div>
            </div>`;
    });

    const clearPostersButton = document.getElementById('clear-posters');

    if (!clearPostersButton) {
        list.insertAdjacentHTML('afterend', `
                <div id="clear-posters" style="text-align: center;padding: 20px;">
                    <button class="btn btn-danger">CLEAR</button>
                </div>
            `);
    }

    document.getElementById('clear-posters').addEventListener('click', () => {
        list.innerHTML = '';
        const clearPostersButton = document.getElementById('clear-posters');
        console.log('clearPostersButton: ', clearPostersButton);
        clearPostersButton.remove();
    });

    const allMovieButtons = document.querySelectorAll('.movie-info-button');

    allMovieButtons.forEach(f => {
        f.onclick = async (event) => {
            var url = `http://www.omdbapi.com/?i=${event.target.dataset.imdbid}&apiKey=9606ae0f`;

            const movieInfo = await fetch(url);

            if (!movieInfo.ok) {
                alert('Hiba történt!');
                return;
            }

            movieInfoData = await movieInfo.json();

            console.log(movieInfoData);

            const modalElem = document.createElement('div', { is: "imdb-movie-info-box" });
            modalElem.setAttribute('id', 'imdb-movie-info-box');
            modalElem.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 50%; height: 50%; background: #f5c519; border-radius: 5px; border: 3px solid black; padding: 10px; z-index: 2;';
            document.body.appendChild(modalElem);

            modalElem.innerHTML = `
                <div style="display: grid; grid-gap: 20px;">
                    <div style="display: grid; grid-template-columns: 1fr auto; justify-content: space-between; font-size: 20px; font-weight: bold">
                        <div>IMDB</div>
                        <div id="close-imdb-movie-info-box" style="cursor: pointer">&#9447;</div>
                    </div>
                    <div>${movieInfoData.Title}</div>
                    <div style="display: grid; grid-gap: 5px">
                        <span style="display: grid; grid-template-columns: 25px 1fr">
                            <span>&#9202;</span>
                            <span>${movieInfoData.Runtime}</span>
                        </span>
                        <span style="display: grid; grid-template-columns: 25px 1fr">
                            <span>&#127909;</span>
                            <span>${movieInfoData.Genre}</span>
                        </span>
                        <span style="display: grid; grid-template-columns: 25px 1fr">
                            <span>&#128197;</span>
                            <span>${movieInfoData.Year}</span>
                        </span>
                        <span style="display: grid; grid-template-columns: 25px 1fr">
                            <span>&#9733;</span>
                            <span>${movieInfoData.imdbRating}</span>
                        </span>
                    </div>
                    <div style="display: grid; grid-gap: 5px">${movieInfoData.Plot}</div>
                </div>
            `;

            const modalOverlayElem = document.createElement('div', { is: "imdb-movie-info-box-overlay" });
            modalOverlayElem.setAttribute('id', 'imdb-movie-info-box-overlay');
            modalOverlayElem.style.cssText = 'position: fixed; top: 0; left: 0; bottom: 0; right:0; background: #000000; opacity: .7; z-index: 1';
            document.body.appendChild(modalOverlayElem);

            document.getElementById('close-imdb-movie-info-box').onclick = (event) => {
                modalElem.remove();
                modalOverlayElem.remove();
            }
            document.getElementById('imdb-movie-info-box-overlay').onclick = (event) => {
                modalElem.remove();
                modalOverlayElem.remove();
            }
        }
    });
}
