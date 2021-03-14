/* get our elements*/
const body = document.querySelector('body');
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges  = player.querySelectorAll('.player__slider');
const previous = player.querySelector('.player__button.previous');
const next = player.querySelector('.player__button.next');
const fullScreenButton = player.querySelector('.full__screen');


/* build out functions */

const togglePlay = (e) => {

    if (e.keyCode === 32) {
        video[video.paused ? 'play' : 'pause']();
    }

    const target = e.currentTarget;

    if (target.classList.contains('viewer') || target.classList.contains('toggle')) {
        video[video.paused ? 'play' : 'pause']();
    }

    return;
}

const updateButton = () => {
    toggle.textContent = video.paused ? '►' : '❚ ❚';
}

const skip = (e) => {
    if (e.keyCode === 37) {
        video.currentTime += parseFloat(previous.dataset.skip);
    }

    if (e.keyCode === 39) {
        video.currentTime += parseFloat(next.dataset.skip);
    }
    
    if (e.target.classList.contains('player__button')) {
        video.currentTime += parseFloat(e.target.dataset.skip);
    }

    return;
}

const handleRangeUpdate =(e) => {  

    if (e.keyCode === 38) {
        video.volume = video.volume < 1 ? video.volume += 0.05 : 1;
        player.querySelector('.player__slider[name="volume"]').value = video.volume;
    }

    if (e.keyCode === 40) {
        video.volume = video.volume > 0 ? video.volume -= 0.05 : 0;
        player.querySelector('.player__slider[name="volume"]').value = video.volume;
    }

    if (e.target.classList.contains('player__slider')) {
        video[e.target.name] = e.target.value;
    }

    return;
}

const handleProgress = () => {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (e) => {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

const fullScreen = (e) => {
    if (e.keyCode === 13) {
        if (!video.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode - ${err.message}`);
            });
        } 
    }

    if (e.key === 'Escape') {
        if (video.exitFullscreen) {
            video.exitFullscreen;
        }
    }

    if (e.target.classList.contains('full__screen')) {
        if (!video.fullscreenElement) {
            video.requestFullscreen();
        } else if (video.exitFullscreen) {
            video.exitFullscreen;
        }
    }
    
}

/* hook up the event listners */

body.addEventListener('keyup', togglePlay);
body.addEventListener('keyup', skip);
body.addEventListener('keyup', handleRangeUpdate);
body.addEventListener('keyup', fullScreen);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
fullScreenButton.addEventListener('click', fullScreen);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    mousedown && scrub(e);
}); 
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

