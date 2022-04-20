import React, { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js';
import "./index.scss"
import { Button } from '@mui/material';

const Identifie = () => {

  const [tracks, setTracks] = useState<any>()
  const [playing, setPlaying] = useState<boolean>(false)
  const [loadingModel, setLoadingModel] = useState<boolean>(false)
  const [timers, setTimers] = useState<any>()
  const [name, setName] = useState<string>("duy")
  const [faceMatcher, setFaceMatcher] = useState<any>()

  const refCamera = useRef<any>(null);
  const refCanvas = useRef<any>(null);

  // Load models
  useEffect(() => {
    const loadModels = async () => {

      const MODEL_URI = process.env.PUBLIC_URL + '/models'

      Promise.all(
        [
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URI),
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI)
        ]
      )
      setLoadingModel(true);
    }
    loadModels()
  }, [])

  useEffect(() => {
    return () => {
      if (playing === true && timers && tracks) {
        setPlaying(false)
        setTracks(null)
        setTimers(0)
        tracks && tracks.forEach((track: any) => { track.stop(); })
        refCamera.current?.srcObject?.getTracks()[0].stop();
        clearInterval(timers)
      }
    }
  }, [playing, timers, tracks])

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

  // Phat hien khuon mat
  const hanldeCameraPlay = () => {

    if (loadingModel && name) {
      const descriptors: any[] = [];
      const timer = setInterval(async () => {
        // Tao canvas de ve 
        if (descriptors.length <= 6) {
          refCanvas.current.innerHTML = faceapi.createCanvasFromMedia(refCamera.current)

          const displaySize = {
            width: 640, height: 480
          }
          faceapi.matchDimensions(refCanvas.current, displaySize)

          // Computing Face Descriptors
          // Tính toán các gốc cạnh trên khuôn mặt
          const detection = await faceapi.detectSingleFace(refCamera.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor()
          const fullFaceDescriptions = faceapi.resizeResults(detection, displaySize)

          // // Xoa cac canvas truoc
          if (refCanvas.current) {
            refCanvas.current.getContext('2d').clearRect(0, 0, 640, 480)
          }


          // Lấy các điểm trong khuôn mặt, sau đó vẽ lên canvas
          const box = fullFaceDescriptions?.detection?.box
          const drawBox = new faceapi.draw.DrawBox(box as any, {
            label: faceMatcher ? faceMatcher.findBestMatch(detection?.descriptor) : "Đang nhận diện..."
          })
          drawBox.draw(refCanvas.current)

          // /* -------------- Huan luyen mo hinh --------------*/
          if (!faceMatcher && !faceMatcher?.findBestMatch(detection?.descriptor)) {
            // Computing Face Descriptors
            const fullFaceDescription = await faceapi.detectSingleFace(refCamera.current).withFaceLandmarks().withFaceDescriptor()
            if (!fullFaceDescription) {
              throw new Error(`no faces detected for ${name}`)
            }

            // Luu 12 descriptors lai
            descriptors.push(fullFaceDescription.descriptor)

            console.log(descriptors.length)

            // Tai xong 12 descriptors 
            if (descriptors.length === 12 || descriptors.length === 11 || descriptors.length === 10) {
              // Tao nhan cho 12 descriptors
              const faceDescriptors = new faceapi.LabeledFaceDescriptors(name, descriptors)
              const faceMatcher = new faceapi.FaceMatcher(faceDescriptors, 0.5)

              console.log("success", { faceDescriptors })
              console.log("success", { faceMatcher })

              // Xoa canvas cuoi cung
              if (refCanvas.current) {
                refCanvas.current.getContext('2d').clearRect(0, 0, 640, 480)
              }

              setFaceMatcher(faceMatcher)
            }
          }
        }
      }, 200)
      setTimers(timer)
    }
  }

  return (
    <div className="identifie">
      <div className="identifie__body">
        {playing ?
          <Button variant='contained' className="identifie__btn-open" onClick={hanldeCloseCamera}>
            <p className='button-text'>Đóng camera</p>
          </Button> :
          <Button variant='contained' className="identifie__btn-open" onClick={handleOpenCamera}>
            <p className='button-text'>Mở camera</p>
          </Button>}

        <div className="identifie__camera">
          {
            playing && <>
              <video onPlay={hanldeCameraPlay} ref={refCamera} autoPlay muted></video>
              <canvas ref={refCanvas}></canvas>
            </>
          }
        </div>

      </div>
    </div >
  )
}

export default Identifie