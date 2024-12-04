console.log('---------------- WINDOW ----------------');

console.log(window);
setTimeout(() => {
    document.all[642].style.backgroundColor = "red";
}, 100)

setTimeout(() => {
    document.all[643].onclick = function () {
        // Itt bármi futtatható
        document.all[643].style.backgroundColor = "green"
    }
}, 100);