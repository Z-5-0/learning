console.log('---------------- LOOPS ----------------');

// Array<number>
var szamok = [2, 4, 13, 4, 6, 42];

var parosakSzama = 0;

parosakSzama += szamok[0] % 2 === 0 ? 1 : 0;

// While
var index = 0;
while (index < 6) {
    index++;
}

index = 0
var paratlanokSzama = 0;
while (index < 6) {
    paratlanokSzama += szamok[index] % 2 === 1 ? 1 : 0;
    index++;
}

console.log('------------------');
console.log('Számok tömbje: ', szamok);
console.log('paratlanokSzama: ', paratlanokSzama);

// For

var paratlanokSzamaUjra = 0;
for (var i = 0; i < 6; i++) {
    paratlanokSzamaUjra += szamok[i] % 2 === 1 ? 1 : 0;
}

console.log('paratlanokSzamaUjra: ', paratlanokSzamaUjra);

// Saját For
var paratlanokSzamaSajat = 0;
for (var i = 0; i < (szamok.length); i++) {
    paratlanokSzamaSajat += szamok[i] % 2 === 1 ? 1 : 0;
}

console.log('paratlanokSzamaSajat: ', paratlanokSzamaSajat);


// For-of

var paratlanokSzamaForOf = 0;
for(var szam of szamok) {
    paratlanokSzamaForOf += szam % 2 == 1 ? 1 : 0;
}

console.log('paratlanokSzamaForOf: ', paratlanokSzamaForOf);
console.log('------------------');