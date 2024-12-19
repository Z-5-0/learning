// natív JS

const btn = document.createElement('button');

btn.onclick = function () {
    alert('Button');
};

btn.innerText = 'Gomb';

document.getElementById('native-button-container').appendChild(btn);

// React

const gomb = React.createElement( // 3 paramétert vár
    'button',
    {
        onClick: function () {
            alert('Button');
        }
    },
    'Gomb'
)

ReactDOM.render( // 2 paramétert vár
    gomb,
    document.getElementById('react-button-container')
);

/* ReactDOM.render(
    <button
        onClick={() => {
            alert('Gomb')
        }}
        className="btn btn-dark"
    >
        Gomb
    </button>,
    document.getElementById('react-button-container-2')
); */
