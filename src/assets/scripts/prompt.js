console.log('---------------- ALERT / PROMPT ----------------');

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initializeListeners);
} else {
  // Ha a DOM már teljesen betöltődött
  initializeListeners();
}

function initializeListeners() {
  const promptButton = document.getElementById("promptListener");
  promptButton.addEventListener("click", showPrompt); // Függvényreferencia (showPrompt) szükséges, nem függvényhívás (showPrompt())

  const alertButton = document.getElementById("alertListener");
  alertButton.addEventListener("click", showAlert); // Függvényreferencia (showAlert) szükséges, nem függvényhívás (showPrompt())

  const ticketing = document.getElementById("ticketingListener");
  ticketing.addEventListener("click", showTicketingPrompt); // Függvényreferencia (showTicketingPrompt) szükséges, nem függvényhívás (showPrompt())
}

function showPrompt() {
  prompt('Ez egy prompt');
}

function showAlert() {
  console.log('!!!!!!!!!');
  alert('Ez egy alert');
}

function showTicketingPrompt() {
  const quantity = prompt('Hány darab jegyet szeretnél?');
  const type = prompt('Felnőtt, vagy diákjegyet szeretnél vásárolni? (adult | student)');
  // student 300 - adult 350
  // More than 10 tickets: 10 % discount

  // Saját megoldás:
  // const result = quantity * (type === 'student' ? 300 : 350) * (quantity > 10 ? 0.9 : 1);
  // console.log(result);
  // alert('Result: ' + result);

  // Saját megoldás nyugdíjas jeggyel bővítésre:

  /* const ticketTypes = {
      student: 300,
      adult: 350,
      pensioner: 280
  }

  const newPrice = ticketTypes[type]; */

  // Kódbázis megoldás

  var types = {
    student: 300,
    adult: 350,
    retired: 280
  }

  // var price = type === 'student' ? 300 : 350;
  var price = types[type]
  var discount = quantity > 10 ? 0.9 : 1;

  var total = quantity * price * discount;

  alert(total);
}
