console.log('---------------- IF / ELSE / SWITCH ----------------');

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initializeListeners);
} else {
    // Ha a DOM már teljesen betöltődött
    initializeListeners();
}


function initializeListeners() {

    const promptYourAge = document.getElementById("promptYourAge");
    promptYourAge.addEventListener("click", promptYourAgeFunction);

    const promptYourAgeWithSwitch = document.getElementById("promptYourAgeWithSwitch");
    promptYourAgeWithSwitch.addEventListener("click", promptYourAgeWithSwitchFunction);

    const promptYourAgeWithSwitchNonExplicit = document.getElementById("promptYourAgeWithSwitchNonExplicit");
    promptYourAgeWithSwitchNonExplicit.addEventListener("click", promptYourAgeWithSwitchNonExplicitFunction);

    const ticketingListenerWithSwitch = document.getElementById("ticketingListenerWithSwitch");
    ticketingListenerWithSwitch.addEventListener("click", ticketingListenerWithSwitchFunction); // Függvényreferencia (showTicketingPrompt) szükséges, nem függvényhívás (showPrompt())

}

function promptYourAgeFunction() {
    promptYourAgeWithSwitchNonExplicit
    var age = prompt('Add meg az életkorod:');
    console.log(age);

    // IF

    if (age < 20) {
        alert('Fiatal vagy!');
    }
    else if (age == 20) { // Három egyenlőségjel esetén (identity) nem működik, ezekszerint a beírt érték string
        alert('Pont 20 éves vagy!');
    }
    else {
        alert('Öreg vagy!');
    }
}

function promptYourAgeWithSwitchFunction() {
    var age = prompt('Add meg az életkorod:');

    // SWITCH

    switch (Number(age)) {
        case 18:
            alert('18 éves vagy!');
            break;
        case 20:
            alert('20 éves vagy!');
            break;
        default:
            alert('Sem 18, sem 20 éves nem vagy!');
    }
}

function promptYourAgeWithSwitchNonExplicitFunction() {
    var age = prompt('Add meg az életkorod:');

    // SWITCH

    switch (true) {
        case age < 20:
            alert('20 évnél fiatalabb vagy!');
            break;
        case age > 20 && age < 30:
            alert('20 és 30 közötti az életkorod!');
            break;
        default:
            alert('Idősebb vagy, mint 30!');
    }
}

function ticketingListenerWithSwitchFunction(firstTime = true) {
    var userExit;

    if (!firstTime) {
        userExit = prompt('Ki szeretnél lépni a promtból? Kilépéshez gépeld be az `igen` szót');
    }

    if (userExit === 'igen') {
        return;
    }

    const quantity = prompt('Hány darab jegyet szeretnél?');
    const type = prompt('Felnőtt, vagy diákjegyet szeretnél vásárolni? (adult | student | retired)');

    var types = {
        student: 300,
        adult: 350,
        retired: 280
    }

    var price = types[type];

    if (price === undefined) {
        alert('Helytelen jegytípus! Add meg újra a jegyek számát, és a típust!');
        firstTime = false;
        ticketingListenerWithSwitchFunction(false);
    } else {
        var discount = quantity > 10 ? 0.9 : 1;

        var total = quantity * price * discount;

        alert(total);
    }
}

