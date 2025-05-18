console.log('---------------- WINDOW ----------------');

console.log(window);
setTimeout(() => {
    document.all[800].style.backgroundColor = "red";
}, 1000);

setTimeout(() => {
    document.all[801].onclick = function () {
        // Itt bármi futtatható
        document.all[801].style.backgroundColor = "green";
    }
}, 1000);