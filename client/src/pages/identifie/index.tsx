import React, { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js';
import "./index.scss"
import { Button } from '@mui/material';
import { ALERT } from '../../store/types/alertTypes'
import { useDispatch } from 'react-redux'

const Identifie = () => {

  const dispatch = useDispatch()
  const [tracks, setTracks] = useState<any>()
  const [playing, setPlaying] = useState<boolean>(false)
  const [loadingModel, setLoadingModel] = useState<boolean>(false)
  const [timers, setTimers] = useState<any>()
  const [studentCode, setStudentCode] = useState<string>("duy")
  const [faceMatcher, setFaceMatcher] = useState<any>()

  const refCamera = useRef<any>(null);
  const refCanvas = useRef<any>(null);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      console.log("dang tai model")
      const MODEL_URI = process.env.PUBLIC_URL + '/models'

      Promise.all(
        [
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URI),
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI)
        ]
      )

      // Tai cac model nhan dien khuon mat thanh cong
      setLoadingModel(true);
      dispatch({ type: ALERT, payload: { success: "Tải các mô hình nhận diện khuôn mặt  thành công" } })
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
    if (loadingModel && studentCode) {
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
          console.log({ detection })
          console.log({ fullFaceDescriptions })
          // // Xoa cac canvas truoc
          if (refCanvas.current) {
            refCanvas.current.getContext('2d').clearRect(0, 0, 640, 480)
          }


          // Lấy các điểm trong khuôn mặt, sau đó vẽ lên canvas
          const box = fullFaceDescriptions?.detection?.box
          const drawBox = new faceapi.draw.DrawBox(box as any, {
            label: "Đang nhận diện..."
          })
          drawBox.draw(refCanvas.current)

          // /* -------------- Huan luyen mo hinh --------------*/

          // Computing Face Descriptors
          const fullFaceDescription = await faceapi.detectSingleFace(refCamera.current)
            .withFaceLandmarks().withFaceDescriptor()

          if (!fullFaceDescription) {
            throw new Error(`no faces detected for ${studentCode}`)
          }

          // Luu 12 descriptors lai
          descriptors.push(fullFaceDescription.descriptor)

          // Tai xong 12 descriptors 
          if (descriptors.length === 12 || descriptors.length === 11 || descriptors.length === 10) {
            // Tao nhan cho 12 descriptors
            const faceDescriptors = new faceapi.LabeledFaceDescriptors(studentCode, descriptors)
            const faceMatcher = new faceapi.FaceMatcher(faceDescriptors, 0.5)

            console.log("success", { faceDescriptors })
            console.log("success", { faceMatcher })

            // Xoa canvas cuoi cung
            if (refCanvas.current) {
              refCanvas.current.getContext('2d').clearRect(0, 0, 640, 480)
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

        <div className="identifie__body-form">
          <label htmlFor="studentCode">Mã số sinh viên *</label>
          <input id="studentCode"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            type="text" placeholder='Vui lòng nhập MSSV...' name='studentCode' />
          {
            playing ?
              <Button variant='contained' className="identifie__btn-open" onClick={hanldeCloseCamera}>
                <p className='button-text'>Đóng camera</p>
              </Button> :
              <Button disabled={studentCode ? false : true} variant='contained' className="identifie__btn-open" onClick={handleOpenCamera}>
                <p className='button-text'>Bắt đầu nhận diện</p>
              </Button>
          }
        </div>


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