console.log('---------------- TEMPLATE LITERAL ----------------');

var photos = [
    {
        id: 1,
        title: "accusamus beatae ad facilis cum similique qui sunt",
        thumbnailUrl: "https://picsum.photos/id/99/150/150/?blur=2"
    },
    {
        id: 2,
        title: "reprehenderit est deserunt velit ipsam",
        thumbnailUrl: "https://picsum.photos/id/149/150/150/?blur=2"
    },
    {
        id: 3,
        title: "officia porro iure quia iusto qui ipsa ut modi",
        thumbnailUrl: "https://picsum.photos/id/199/150/150/?blur=2"
    },
    {
        id: 4,
        title: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
        thumbnailUrl: "https://picsum.photos/id/249/150/150/?blur=2"
    }
];

var photoListTemplate = ''; 

for (var photo of photos) {
    photoListTemplate = photoListTemplate + `
    <div id="${photo.id}" class="card p-1" 
        style="border: 1px solid grey; border-radius: 5px; padding: 5px; ${photo.id === 3 ? 'background-color: pink' : ''}">
        <div><small>${photo.title}</small></div>
        <br>
        <img src="${photo.thumbnailUrl}">
    </div>
    <br>
    `
}

document.getElementById('photos-list-container').innerHTML = photoListTemplate;