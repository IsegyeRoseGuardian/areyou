const songs = [
    { title: "초절정귀여워알유", artist: "알유", src: "music/초절정귀여워알유.mp3", img: "img/초절정귀여워알유.jpg" },
    { title: "우왁굳 구간단속 - HUSH", artist: "알유", src: "music/우왁굳 구간단속 - HUSH 커버.mp3", img: "img/우왁굳 구간단속 - HUSH 커버 알유 일반인 선수.jpg" },
    { title: "Part of your world Live Cover", artist: "알유", src: "music/Part of your world Live Cover.mp3", img: "img/Part of your world Live Cover.jpg" },
];

let currentSongIndex = 0;

const audio = document.getElementById('audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songImage = document.getElementById('song-image');
const playPauseBtn = document.querySelector('.control_song img');
const timeSlider = document.getElementById("time-slider");
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    songImage.src = song.img;
}

function updateSlider() {
    const position = (audio.currentTime / audio.duration) * 100;
    timeSlider.value = position;
}

function updateTimeDisplay() {
    const currentMinutes = Math.floor(audio.currentTime / 60);
    const currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
    currentTimeDisplay.textContent = `${currentMinutes < 10 ? '0' : ''}${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;

    const durationMinutes = Math.floor(audio.duration / 60);
    const durationSeconds = Math.floor(audio.duration - durationMinutes * 60);
    durationDisplay.textContent = `${durationMinutes < 10 ? '0' : ''}${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
}

function seekSong() {
    const sliderPosition = timeSlider.value;
    audio.currentTime = (audio.duration * sliderPosition) / 100;
}

function toggleVolumeSlider() {
    const slider = document.getElementById("volume-slider");
    slider.style.display = slider.style.display === "none" ? "block" : "none";
}

function setVolume(value) {
    audio.volume = value;
}

function togglePlayPause() {
    if (audio.paused || audio.currentTime === 0) {
        audio.play();
        playPauseBtn.src = 'icon/pause_48dp_FILL0_wght400_GRAD0_opsz48.png';
    } else {
        audio.pause();
        playPauseBtn.src = 'icon/play_arrow_48dp_FILL0_wght400_GRAD0_opsz48.png';
    }
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = 'icon/pause_48dp_FILL0_wght400_GRAD0_opsz48.png';
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = 'icon/pause_48dp_FILL0_wght400_GRAD0_opsz48.png';
}

function playRandomSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    
    currentSongIndex = randomIndex;
    loadSong(currentSongIndex);
    audio.play();
    playPauseBtn.src = 'icon/pause_48dp_FILL0_wght400_GRAD0_opsz48.png';
}


audio.addEventListener('timeupdate', () => {
    updateSlider();
    updateTimeDisplay();
});

audio.addEventListener('loadedmetadata', updateTimeDisplay);

audio.addEventListener('ended', playNextSong);

const songList = document.getElementById('song-list');
songs.forEach((song, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${song.title} - ${song.artist}`;
    listItem.onclick = () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        audio.play();
    };
    songList.appendChild(listItem);
});

loadSong(currentSongIndex);
