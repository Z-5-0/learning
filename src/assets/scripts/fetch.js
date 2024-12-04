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
};

window.onload = renderForm;

function renderForm() {
    console.log(state.isLoggedIn);
    if (state.isLoggedIn) {
        document.getElementById("login-component").innerHTML = "";

        if (document.getElementById('fetch-logout')) {
            document.getElementById('fetch-logout').addEventListener('click', function (event) {
                state.isLoggedIn = false;
                state.users = [];
                document.getElementById('user-list-container').innerHTML = '';
                renderForm();
            });
        }
        return;
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
            <div>
                <button id="fetchSubmit" type="submit" ${state.isLoginPending ? "disabled" : ""}
                    style="margin-top: 20px">
                        Bejelentkezés
                </button>
            </div>
          <div id="fetchErrorMessage">
            ${state.isLoginPending ? "Bejelentkezés folyamatban..." : ""}
          </div>
        </form>
      </div>
    `;

    var fetchForm = document.getElementById('log-in');

    fetchForm.querySelectorAll('input')[0].value = 'eve.holt@reqres.in';
    fetchForm.querySelectorAll('input')[1].value = 'ok';

    fetchForm.onsubmit = function (event) {
        event.preventDefault();

        renderErrors('');

        var email = event.target.elements.email.value;
        var password = event.target.elements.password.value;

        var body = JSON.stringify({email, password});

        state.isLoginPending = true;
        renderForm();

        fetch('https://reqres.in/api/login', {
            method: 'POST', body, headers: {
                'Content-type': 'application/json'
            }
        }).then(function (response) {
            if (!response.ok) {
                return Promise.reject({error: 'Login failed'});
            }
            return response.json();
        }).then(function (response) {
            state.isLoggedIn = true;
            state.isLoginPending = false;
            renderForm();
            return fetch('https://reqres.in/api/users')
        }).then(function (response) {
            if (!response.ok) {
                return Promise.reject({error: 'Get user list failed'});
            }
            return response.json();
        }).then(function (userPage) {
            state.users = userPage.data;
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

    newList = '<ul class="list-group">'
    for (var s of state.users) {
        newList += `<li class="list-group-item">${s.first_name} ${s.last_name}</li>`;
    }
    newList += `
        </ul>
        <button id="fetch-logout" style="margin-top: 20px">Kijelentkezés</button>
    `;

    userListContainer.innerHTML = newList;

    state.isLoginPending = false;
    renderForm();

    console.log('state: ', state);
}

function renderErrors(errorMsg) {
    var errorContainer = document.getElementById('fetchErrorMessage');
    errorContainer.innerHTML = errorMsg;
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

