console.log('---------------- ASYNC ----------------');

var login2 = document.getElementById('log-in-2');
login2.querySelectorAll('input')[0].value = 'eve.holt@reqres.in';
login2.querySelectorAll('input')[1].value = 'ok';

var email = '';
var pass = '';

login2.onsubmit = function (event) {
    event.preventDefault();

    email = event.target.elements.email.value;
    password = event.target.elements.password.value;

    loginAndFetchUsers();
}

async function loginAndFetchUsers() {
    // await

    var body = JSON.stringify({ email, password });
    var loginResponse = await fetch('https://reqres.in/api/login', {
        method: 'POST',
        body,
        headers: {
            'Content-type': 'application/json',
            'x-api-key': 'reqres-free-v1'
        }
    });

    console.log('async - await loginResponse: ', loginResponse);

    if (!loginResponse.ok) {
        alert('Bejelentkezés sikertelen (ERROR)');
        return;
    } else {
        alert('Sikeres bejelentkezés (OK)');
    }

    var tokenObj = await loginResponse.json();

    console.log('token: ', tokenObj.token);

    var usersResponse = await fetch('https://reqres.in/api/users', { headers: { 'x-api-key': 'reqres-free-v1' } });

    if (!usersResponse.ok) {
        alert('Nincsenek userek (ERROR)');
        return;
    } else {
        alert('Userek letöltés indul (OK)');
    }

    var usersPage = await usersResponse.json();

    var listOfUsers = document.getElementById('user-list');

    usersPage.data.map(m => {
        console.log(m);
        listOfUsers.innerHTML += `<div>${m.first_name} ${m.last_name}</div>`
    });
}
