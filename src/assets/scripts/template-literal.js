console.log('---------------- TEMPLATE LITERAL ----------------');

var photos = [
    {
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        thumbnailUrl: "https://via.placeholder.com/150/92c952"
    },
    {
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        thumbnailUrl: "https://via.placeholder.com/150/771796"
    },
    {
        id: 3,
        title: "officia porro iure quia iusto qui ipsa ut modi",
        thumbnailUrl: "https://via.placeholder.com/150/24f355"
    },
    {
        id: 4,
        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        thumbnailUrl: "https://via.placeholder.com/150/d32776"
    }
];

var photoListTemplate = ''; 

for (var photo of photos) {
    photoListTemplate = photoListTemplate + `
    <div id="${photo.id}" class="card p-5" 
        style="border: 1px solid grey; border-radius: 5px; padding: 10px; ${photo.id === 3 ? 'background-color: pink' : ''}">
        <div><small>${photo.title}</small></div>
        <br>
        <img src="${photo.thumbnailUrl}">
    </div>
    <br>
    `
}

document.getElementById('photos-list-container').innerHTML = photoListTemplate;