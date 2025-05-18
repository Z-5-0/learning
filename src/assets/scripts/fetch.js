console.log('---------------- FETCH ----------------');

/*
    Login url: https://reqres.in/api/login
    Body:
    {
      email: "eve.holt@reqres.in",
      password: "ok"
    }

    Users url: https://reqres.in/api/users
*/

var state = {
    users: [],
    isLoggedIn: false,
    isLoginPending: false,
    errorMsg: ''
};

window.onload = renderForm;

function renderForm() {
    console.log('state.isLoggedIn: ', state.isLoggedIn);
    if (state.isLoggedIn) {
        document.getElementById("login-component").innerHTML = "";


    }

    document.getElementById("login-component").innerHTML = `
      <div class="card p-3">    
        <b id="log-in-title" style="display: block;padding-bottom: 20px">Bejelentkezés</b>   
        <form id="log-in">
            <div>
                <label class="w-100">Email:
                    <input type="text" name="email" class="form-control" ${state.isLoginPending ? "disabled" : ""}/>
                </label>
            </div>
            <div>
                <label class="w-100">Jelszó:
                    <input type="password" name="password" class="form-control" ${state.isLoginPending ? "disabled" : ""}/>
                </label>      
            </div>
            <div style="display: flex; justify-content: space-between">
                <button id="fetchSubmit" class="btn btn-secondary" type="submit" ${(state.isLoginPending || state.isLoggedIn) ? "disabled" : ""}
                    style="margin-top: 20px">
                        Bejelentkezés
                </button>
                <button id="fetch-logout" class="btn btn-danger" style="margin-top: 20px" type="button" ${(state.isLoginPending || !state.isLoggedIn) ? "disabled" : ""}>
                    Kijelentkezés
                </button>
            </div>
          <div id="fetchErrorMessage">
            ${state.isLoginPending ? "Bejelentkezés folyamatban..." : state.errorMsg}
          </div>
        </form>
      </div>
    `;

    if (document.getElementById('fetch-logout')) {
        document.getElementById('fetch-logout').addEventListener('click', function (event) {
            state.isLoggedIn = false;
            state.users = [];
            document.getElementById('user-list-container').innerHTML = '';
            renderForm();
        });
    }

    var fetchForm = document.getElementById('log-in');

    fetchForm.querySelectorAll('input')[0].value = 'eve.holt@reqres.in';
    fetchForm.querySelectorAll('input')[1].value = 'ok';

    fetchForm.onsubmit = function (event) {
        event.preventDefault();

        renderErrors('');

        var email = event.target.elements.email.value;
        var password = event.target.elements.password.value;

        var body = JSON.stringify({ email, password });

        state.isLoginPending = true;
        renderForm();

        fetch('https://reqres.in/api/login', {
            method: 'POST', body, headers: {
                'Content-type': 'application/json',
                'x-api-key': 'reqres-free-v1'
            }
        }).then(function (response) {
            if (!response.ok) {
                return Promise.reject({ error: 'Login failed' });
            }
            // console.log('response.json() ', response.json().then(resp => console.log(resp))); // {token: 'QpwL5tke4Pnpja7X4'}
            return response.json();
        }).then(function (response) {
            state.isLoggedIn = true;
            state.isLoginPending = false;
            renderForm();
            return fetch('https://reqres.in/api/users', { headers: { 'x-api-key': 'reqres-free-v1' } })
        }).then(function (response) {
            if (!response.ok) {
                return Promise.reject({ error: 'Get user list failed' });
            }
            // console.log(await response.json());
            return response.json();
        }).then(function (users) {
            state.users = users.data;
            renderUsers();
        }).catch(function (error) {
            state.isLoginPending = false;
            renderErrors(error.error);
        });
    }
}

function renderUsers() {
    var userListContainer = document.getElementById('user-list-container');

    var newList = '';

    console.log('usr render');

    newList = '<ul class="list-group">'
    for (var s of state?.users) {
        newList += `<li class="list-group-item">${s.first_name} ${s.last_name}</li>`;
    }
    newList += `
        </ul>
    `;

    console.log('usr render: ', newList);

    userListContainer.innerHTML = newList;

    state.isLoginPending = false;
    renderForm();

    console.log('state: ', state);
}

function renderErrors(errorMsg) {
    // var errorContainer = document.getElementById('fetchErrorMessage');
    // errorContainer.innerHTML = errorMsg;
    state.errorMsg = errorMsg;
    state.isLoginPending = false;
    renderForm();
}

// + FELADAT 1
// Ha a bejelentkezés sikeres, a form tűnjön el, a userek pedig listázódjanak ki
// Lehet úgy, hogy a form megjelenése egy boolean értékétől függ

// + FELADAT 2
// Az egyes then() blokkok valahova kiiratása, hogy melyik fázisban vagyunk éppen (logging-in, stb)
// Praktikusan network throttling a tesztelésre

// + FELADAT 3
// Amíg a bejelentkezés folyamatban van, az input mezők legyenek disabled-re állítva (a submit gomb is)
// Praktikusan network throttling a tesztelésre

