console.log('---------------- AJAX ----------------');

// http://jsonplaceholder.typicode.com/posts

document.getElementById('fetch-posts').onclick = function () {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);

            var posts = '';

            for (var res of response) {
                posts += `
                <div class="card" style="padding: 10px; margin: 10px; border: 1px solid gray; border-radius: 5px">
                    <div>ID: ${res.id}</div>
                    <div>UserID: ${res.userId}</div>
                    <div>Title:  ${res.title}</div>
                    <div>Body:  ${res.body}</div>
                </div>
                `
            }

            var postListContainer = document.getElementById('post-list-container');

            postListContainer.style.border = '1px solid black';
            postListContainer.innerHTML = posts;

        }
    }

    xhr.open('GET', 'http://jsonplaceholder.typicode.com/posts');

    xhr.send();
}

// ---------------------------------- //

document.getElementById('fetch-anything').onclick = function () {
    var url = 'https://jsonplaceholder.typicode.com/posts';
    var method = 'GET';
    var body = null;
    var callback = function (posts) {
        var content = '';

        for (var post of posts) {
            content += `
                <div class="card" style="padding: 10px; margin: 10px; border: 1px solid gray; border-radius: 5px">
                    <div>ID: ${post.id}</div>
                    <div>UserID: ${post.userId}</div>
                    <div>Title:  ${post.title}</div>
                    <div>Body:  ${post.body}</div>
                </div>
                `
        }

        var anythingListContainer = document.getElementById('anything-container');

        anythingListContainer.style.border = '1px solid black';
        anythingListContainer.innerHTML = content;
    };

    sendRequest(url, method, body, callback);
}

function sendRequest(url, method, body, callback) {
    var xhr = new XMLHttpRequest;

    xhr.onreadystatechange = function () {
        console.log('onreadystatechange');
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }

    xhr.open(method, url);

    xhr.setRequestHeader('content-type', 'application/json');

    xhr.setRequestHeader('x-api-key', 'reqres-free-v1');

    xhr.send(body);
}

// ---------------------------------- //

document.getElementById('login').onclick = function () {
    var url = 'https://reqres.in/api/login';
    var body = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
    });
    var headers = { 'x-api-key': 'reqres-free-v1' };

    sendRequest(url, 'POST', body, function (token) {
        console.log(token);
        document.getElementById('login-token-id').innerHTML = token.token;

        sendRequest('https://reqres.in/api/users', 'GET', null, function (users) {
            console.log(users);
        });
    });
}


// ---------------------------------- //

function sendRequest2(url, method, body) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr.responseText);
                }
            }
        }

        xhr.open(method, url);
        xhr.setRequestHeader('content-type', 'application/json');
        xhr.setRequestHeader('x-api-key', 'reqres-free-v1');
        xhr.send(body);
    });
}

document.getElementById('login2').onclick = function () {
    var url = 'https://reqres.in/api/login';
    var body = JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
    });
    var headers = { 'x-api-key': 'reqres-free-v1' };

    sendRequest2(url, 'POST', body, headers)
        .then(function (response) {
            console.log('Promise response: ', response);
            document.getElementById('login-token-id2').innerHTML = response.token;
            return sendRequest2('https://reqres.in/api/users', 'GET', null);
        })
        .then(function (elozoThenVisszateresiErteke) {
            console.log('Another than 1', elozoThenVisszateresiErteke);
            return sendRequest2('https://reqres.in/api/tovabbiEroforras1', 'GET', null);
        })
        .then(function (elozoThenVisszateresiErteke) {
            console.log('Another than 2', elozoThenVisszateresiErteke);
        })
        .catch(function (error) {
            console.log(error);
        });
}