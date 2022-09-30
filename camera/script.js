const video = document.getElementById("camVideo");
const mediaDevices = navigator.mediaDevices;
let stream = null;
let cameraOn = false;
document.getElementById("toggleCamera").addEventListener("click", async () => {
  if (!stream) {
    // if camera off
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.onloadedmetadata = () => video.play();
    } catch (error) {
      console.error(error);
    }
  } else {
    // if camera on
    video.pause();
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
    video.srcObject = null;
    video.src = "";
  }
});
