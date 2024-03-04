let term = '';
const songContainer = document.getElementById('songs');
const searchInput = document.getElementById('searchInput');

const updateTerm = () => {
    term = searchInput.value.trim();

    if (!term) {
        alert('Please enter a search term');
    } else {
        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }

        const url = `https://itunes.apple.com/search?limit=10&media=music&term=${encodeURIComponent(term)}`;
        fetch(url)
            .then((Response) => Response.json())
            .then((data) => {
                const artists = data.results;
                return artists.map((result) => {
                    const article = document.createElement('article'),
                        artist = document.createElement('p'),
                        song = document.createElement('p'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        audioSource = document.createElement('source');

                    artist.innerHTML = result.artistName;
                    song.innerHTML = result.trackName;
                    img.src = result.artworkUrl100;
                    audioSource.src = result.previewUrl;
                    audio.appendChild(audioSource);
                    audio.setAttribute('controls', '');
                    article.appendChild(img);
                    article.appendChild(artist);
                    article.appendChild(song);
                    article.appendChild(audio);
                    songContainer.appendChild(article);
                });
            })
            .catch((error) => console.log('Request failed:', error));
    }
};

const searchBtn = document.querySelector('button');
searchBtn.addEventListener('click', updateTerm);

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        updateTerm();
    }
});

document.addEventListener('play', (event) => {
    const audio = document.getElementsByTagName('audio');
    for (let i = 0; i < audio.length; i++) {
        if (audio[i] !== event.target) {
            audio[i].pause();
        }
    }
}, true);
