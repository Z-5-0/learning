var valtozo = 1;

window.onload = async function () {
    fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()).then(res => document.getElementById('fetchFirstPostTitle').innerHTML = res[0].title);
}
