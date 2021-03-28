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
        let pixels = ctx.getImageData(0, 0, width, height);
        pixels = redEffect(pixels);

    }, 16);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    // handle data 
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
    for(let i = 0; i < pixels.length; i +=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; //Red
        
        pixels.data[i + 2] = pixels.data[i + 1] - 50; // Green

        pixels[i + 2]
    }
}



getVideo();

video.addEventListener('canplay', paintToCanvas);