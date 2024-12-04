console.log('---------------- Ticket ----------------');

let allMovies = {};
let selectedMovie = {};
let bookedSeats = [];
let selectedSeats = [];
let abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let userName = "";

const movieSelector = document.getElementById('movie-select');
if (movieSelector) {
  movieSelector.addEventListener('change', (option, index) => {
    renderSeats(option.target.value);
  });
}

console.log('!!!!!', movieSelector);

const sendReservation = document.getElementById('send-reservation');
sendReservation.onsubmit = function (event) {
  event.preventDefault();
  console.log(selectedMovie.id);
  fetch(`https://kodbazis.hu/api/book-seats/${selectedMovie.id}`, {
    method: 'POST',
    body: selectedSeats.map(seat => {
      return {row: seat.split('')[0], number: seat.split('')[1]};
    }),
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(async res => {
      console.log(await res.json());
    });
};

getMovies();

function getMovies() {
  fetch("https://kodbazis.hu/api/movies")
    .then(res => res.ok ? res.json() : [])
    .then(result => {
      allMovies = result;
      fillMovieOptions();
    });
}

function fillMovieOptions() {
  let options = [];
  for (let m of allMovies) {
    options.push(generateOption({optionID: m.id, optionName: m.name}));
  }
  for (let o of options) {
    movieSelector.append(o);
  }
}

function generateOption(option) {
  const opt = document.createElement('option');
  opt.value = option.value = option.optionID;
  opt.innerText = option.optionName;
  return opt;
}

function renderSeats(movieID) {
  let auditorium = document.getElementById('auditorium');
  auditorium.innerHTML = '';
  selectedSeats = [];
  changeSeatNumberAndPrice();

  selectedMovie = allMovies.find(f => f.id == movieID);
  bookedSeats = selectedMovie.bookedSeats.map(m => {
    return m.row + (m.number).toString();
  });

  for (let i = 0; i < selectedMovie.numberOfRows; i++) {
    let row = document.createElement('div');
    row.classList.add('row');

    let rowLabel = document.createElement('div');
    rowLabel.classList.add('row-label');
    rowLabel.innerText = abc[i];
    row.append(rowLabel);

    for (let j = 1; j < (selectedMovie.numberOfSeats + 1); j++) {
      let seat = document.createElement('div');
      seat.classList.add('seat');
      seat.dataset.row = abc[i];
      seat.dataset.number = j.toString();
      seat.dataset.seat = abc[i] + j.toString();
      seat.dataset.booked = bookedSeats.some(s => s === (abc[i] + j.toString())) || false;

      seatSelection(seat);

      let seatLabel = document.createElement('span');
      seatLabel.innerText = j;

      seat.append(seatLabel);
      row.append(seat);
    }

    auditorium.append(row);
  }
}


function seatSelection(seat) {
  if (seat.dataset.booked === 'false') {
    seat.addEventListener('click', (event) => {
      if (event.target.classList.contains('selected')) {
        event.target.classList.remove('selected');
        selectedSeats.splice(selectedSeats.indexOf(seat.dataset.seat), 1);
      } else {
        event.target.classList.add('selected');
        selectedSeats.push(seat.dataset.seat);
      }
      changeSeatNumberAndPrice();
    });
  } else {
    seat.classList.add('booked');
  }
}

function changeSeatNumberAndPrice() {
  document.getElementById('seat-number').innerText = selectedSeats.length;
  document.getElementById('seat-price').innerText = selectedMovie.price * selectedSeats.length || 0;
}
