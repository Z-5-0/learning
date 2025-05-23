console.log('---------------- WINDOW ----------------');

console.log(window);
setTimeout(() => {
    document.all[831].style.backgroundColor = "red";
}, 1000);

setTimeout(() => {
    document.all[832].onclick = function () {
        // Itt bármi futtatható
        document.all[832].style.backgroundColor = "green";
    }
}, 1000);