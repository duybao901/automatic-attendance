import React, { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js';
import "./index.scss"

const Identifie = () => {

  const [tracks, setTracks] = useState<any>()
  const [playing, setPlaying] = useState<boolean>(false)
  const [loadingModel, setLoadingModel] = useState<boolean>(false)
  const [timers, setTimers] = useState<any>()

  const refCamera = useRef<any>(null);
  const refCanvas = useRef<any>(null);

  // Load models
  useEffect(() => {
    const loadModels = async () => {

      const MODEL_URI = process.env.PUBLIC_URL + '/models'

      Promise.all(
        [
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URI),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI)
        ]
      )
      setLoadingModel(true);
    }
    loadModels()
    return () => {
      hanldeCloseCamera();
    }
  }, [])

  // Play camera
  const handleOpenCamera = () => {
    if (navigator.mediaDevices && loadingModel) {
      setPlaying(true)
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        let video = refCamera.current
        if (video) {
          video.srcObject = stream
          const track = stream.getTracks()
          setTracks(track)
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }

  // Close camera
  const hanldeCloseCamera = () => {
    if (tracks) {
      setPlaying(false)
      tracks && tracks.forEach((track: any) => { track.stop(); })
      refCamera.current?.srcObject?.getTracks()[0].stop();
      clearInterval(timers)
    }
  }

  const hanldeCameraPlay = () => {
    if (loadingModel) {
      const timer = setInterval(async () => {

        // Tao canvas de ve 
        refCanvas.current.interHTML = faceapi.createCanvasFromMedia(refCamera.current)
        
        const displaySize = {
          width: 640, height: 480
        }
        faceapi.matchDimensions(refCanvas.current, displaySize)

        const detections = await faceapi.detectAllFaces(refCamera.current, new faceapi.SsdMobilenetv1Options).withFaceLandmarks()
        const resizeDetections = faceapi.resizeResults(detections, displaySize)

        // Xoa cac canvas truoc
        if (refCanvas.current) {
          refCanvas.current.getContext('2d').clearRect(0, 0, 640, 480)
        }

        // Ve
        faceapi.draw.drawDetections(refCanvas.current, resizeDetections) // Ve o vuong phat hien
        faceapi.draw.drawFaceLandmarks(refCanvas.current, resizeDetections) // Ve chi tiet khuon mat


        console.log(detections)
      }, 100)
      setTimers(timer)
    }
  }

  return (
    <div className="identifie">
      <div className="identifie__body">
        {playing ? <button className="identifie__btn-open" onClick={hanldeCloseCamera}>Đóng camera</button> : <button className="identifie__btn-open" onClick={handleOpenCamera}>Mở camera</button>}

        {
          playing && <div className="identifie__camera">
            <video onPlay={hanldeCameraPlay} ref={refCamera} autoPlay muted></video>
            <canvas ref={refCanvas}></canvas>
          </div>
        }
      </div>
    </div >
  )
}

export default Identifie