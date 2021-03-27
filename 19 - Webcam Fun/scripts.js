const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

async function getVideo() {
    try{
        const localMediaStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
        console.log('localMediaStream', localMediaStream);
        video.srcObject = localMediaStream;
        video.play();
    }catch(err) {
        alert('Cannot get Stream', err);
    }
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();
}

getVideo();