console.log('---------------- OBJECT BLUEPRINT ----------------');

var addOne = function (szam) {
    return szam + 1;
}

var addTwo = szam => szam + 2;

console.log(addOne(3));
console.log(addTwo(4));

fetch('https://reqres.in/api/users')
    .then(function (response) {
        return response.json();
    }).then(function (content) {
    console.log(content)
});

fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(content => {
        console.log(content)
    });

fetch('https://reqres.in/api/users')
    .then(response => response.json())
    .then(page => page.data[0])
    .then(user => `${user.first_name} ${user.last_name}`)
    .then(content => {
        console.log(content)
    });

fetch("https://reqres.in/api/users")
    .then(response => response.json())
    .then(page => page.data[0])
    .then(user => {
        const name = `${user.first_name} ${user.last_name}`;
        return name;
    })
    .then(name => ({userName: name}))
    .then((content) => {
        console.log(content);
    });

var vegeredmeny = [1, 3, 4, 6, 45, 56]
    .filter(szam => szam % 2 === 0)
    .map(szam => szam / 2)
    .reduce((acc, cr) => acc + cr);

console.log('végeredmény: ', vegeredmeny);
