import React, { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js';
import "./index.scss"
import { Button } from '@mui/material';
import { ALERT } from '../../store/types/alertTypes'
import { useDispatch, useSelector } from 'react-redux'
import { postAPI } from '../../utils/fetchApi'
import { RootStore } from '../../utils/interface'

const Identifie = () => {

  const dispatch = useDispatch()
  const { auth } = useSelector((state: RootStore) => state)
  const [tracks, setTracks] = useState<any>()
  const [playing, setPlaying] = useState<boolean>(false)
  const [loadingModel, setLoadingModel] = useState<boolean>(false)
  const [timers, setTimers] = useState<any>()
  const [studentCode, setStudentCode] = useState<string>("")
  const [isDetecttion, setIsDetection] = useState<boolean>(false)
  const [isRecognition, setIsRecognition] = useState<boolean>(false)

  const refCamera = useRef<any>(null);
  const refCanvas = useRef<any>(null);

  // Tai cac mo hinh nhan dien khuon mat da duoc train san
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URI = process.env.PUBLIC_URL + '/models'

      Promise.all(
        [
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URI), // Pre-trained model dùng để phát hiện gương mặt.
          // faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URI), // FaceLandmark68Net Model: Pre-trained model dùng để xác định được các điểm xung quanh mặt.
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URI) // Pre-trained model dùng để nhận dạng gương mặt.
        ]
      )

      // Tai cac model nhan dien khuon mat thanh cong
      setLoadingModel(true);
      dispatch({ type: ALERT, payload: { success: "Tải các Pre-trained model thành công" } })
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

  // Open camera
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
    setIsDetection(true)
    if (loadingModel && studentCode) {
      const descriptors: any[] = [];
      let flag = false;
      const timer = setInterval(async () => {
        // Tao canvas de ve 
        if (descriptors.length <= 6 && flag === false) {
          refCanvas.current.innerHTML = faceapi.createCanvasFromMedia(refCamera.current)
          const displaySize = {
            width: 640, height: 480
          }

          faceapi.matchDimensions(refCanvas.current, displaySize)

          // Computing Face Descriptors
          // Tính toán các gốc cạnh trên khuôn mặt
          const detection = await faceapi.detectSingleFace(refCamera.current, new faceapi.SsdMobilenetv1Options()).withFaceLandmarks().withFaceDescriptor()

          if (detection) {
            const fullFaceDescriptions = faceapi.resizeResults(detection, displaySize)

            setIsDetection(false)
            setIsRecognition(true)

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
            if (flag === false && (descriptors.length === 4 || descriptors.length === 3 || descriptors.length === 2)) {
              console.log(descriptors)
              // Gan nhan
              const labedlFaceDescriptors = new faceapi.LabeledFaceDescriptors(studentCode, descriptors);
              console.log({ labedlFaceDescriptors })
              saveFile(labedlFaceDescriptors)

              flag = true
              setStudentCode("")
              hanldeCloseCamera()
              setIsRecognition(false)
              dispatch({ type: ALERT, payload: { success: `Nhận diện ${studentCode} thành công` } })

              // Xoa canvas cuoi cung
              if (refCanvas.current) {
                refCanvas.current.getContext('2d').clearRect(0, 0, 640, 480)
              }
            }
          }

        }
      }, 200)
      setTimers(timer)
    }
  }

  const saveFile = async (labedlFaceDescriptors: any) => {
    const labedlFaceDescriptorsJson = faceapi.LabeledFaceDescriptors.fromJSON(labedlFaceDescriptors).toJSON()

    console.log({ labedlFaceDescriptorsJson })

    try {
      const res = await postAPI('face_api', labedlFaceDescriptorsJson, auth.access_token)
      console.log(res)
    } catch (error: any) {
      console.log(error.response)
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
              <>
                {
                  isDetecttion ? <p style={{ marginTop: "20px", fontSize: "1.4rem", fontWeight: "500" }}>
                    Đang <span style={{ color: 'crimson', textTransform: "uppercase" }}>phát hiện</span>  khuôn mặt, xin vui lòng chờ...
                  </p> : isRecognition && <p style={{ marginTop: "20px", fontSize: "1.4rem", fontWeight: "500" }}>
                    Đang <span style={{ color: '#473fce', textTransform: "uppercase" }}>nhận hiện</span> khuôn mặt, xin vui lòng chờ...
                  </p>
                }
              </>
              : <Button disabled={studentCode ? false : true} variant='contained' className="identifie__btn-open" onClick={handleOpenCamera}>
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