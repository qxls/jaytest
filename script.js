const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const audioPlayer = document.getElementById("audio-player");
const progressBar = document.getElementById("progress-bar");
const volumeBar = document.getElementById("volume");
const songName = document.getElementById("song-name");
const artistName = document.getElementById("artist-name");
const albumCover = document.getElementById("album-cover");

let isPlaying = false;

// Function to play/pause music
playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseButton.textContent = "▶";
  } else {
    audioPlayer.play();
    playPauseButton.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

// Update progress bar as song plays
audioPlayer.addEventListener("timeupdate", () => {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
});

// Set song progress when clicked on progress bar
progressBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audioPlayer.currentTime = (value / 100) * audioPlayer.duration;
});

// Change volume
volumeBar.addEventListener("input", (e) => {
  audioPlayer.volume = e.target.value / 100;
});

// Skip to next song (for demo purposes, set a new song)
nextButton.addEventListener("click", () => {
  // Set a new song for demonstration purposes
  audioPlayer.src = "next-song.mp3"; // replace with actual file path
  audioPlayer.play();
  playPauseButton.textContent = "⏸";
  songName.textContent = "New Song Title";
  artistName.textContent = "New Artist";
  albumCover.src = "new-cover.jpg"; // replace with new cover image
  isPlaying = true;
});

// Skip to previous song (for demo purposes, set a previous song)
prevButton.addEventListener("click", () => {
  // Set a previous song for demonstration purposes
  audioPlayer.src = "previous-song.mp3"; // replace with actual file path
  audioPlayer.play();
  playPauseButton.textContent = "⏸";
  songName.textContent = "Previous Song Title";
  artistName.textContent = "Previous Artist";
  albumCover.src = "previous-cover.jpg"; // replace with previous cover image
  isPlaying = true;
});
function loadAlbum(albumKey, albumData) {
  const albumElement = document.createElement('div');
  albumElement.classList.add('album');
  albumElement.innerHTML = `
    <img src="${albumData.cover}" alt="${albumKey}">
    <div class="album-name">${albumKey}</div>
  `;
  albumElement.addEventListener('click', () => loadSongs(albumKey, albumData.songs));
  return albumElement;
}

Object.keys(musicData).forEach(albumKey => {
  const albumData = musicData[albumKey];
  document.getElementById('albumList').appendChild(loadAlbum(albumKey, albumData));
});
