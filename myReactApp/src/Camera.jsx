import { useEffect, useRef, useState } from 'react';

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const getCameraFeed = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { exact: "environment" }, // Specifies the rear camera
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30, max: 60 }
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    getCameraFeed();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      setCapturedImage(url);
    }, 'image/jpeg');
  };

  const saveImage = () => {
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = 'captured-image.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", height: "auto" }}
      />
      <div>
        <button onClick={captureImage}>Capture Image</button>
        {capturedImage && (
          <div>
            <img src={capturedImage} alt="Captured" style={{ maxWidth: "100%", marginTop: "10px" }} />
            <button onClick={saveImage}>Save Image</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraComponent;



