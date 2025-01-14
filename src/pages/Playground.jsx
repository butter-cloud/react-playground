import {
  getConnectedDevices,
  playVideoFromCamera,
} from '../utils/devices/handleDevice'
import { useEffect, useState } from 'react'

export function Playground() {
  const [devices, setDevices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const constraints = {
    video: true,
    audio: true,
  }

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Access media devices (camera and microphone)
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          // console.log('Got MediaStream:', stream)
        })
        .catch((error) => {
          alert(
            'Error accessing media devices. Please ensure you have granted permissions.',
          )
          console.error('Error accessing media devices:', error)
        })

      // Get video devices
      getConnectedDevices('videoinput')
        .then((videoDevices) => {
          if (videoDevices && videoDevices.length > 0) {
            setDevices(videoDevices)
            setIsLoading(false)
            playVideoFromCamera(videoDevices[0].deviceId) // Safe to access videoDevices[0]
          } else {
            console.log('No video devices found.')
            setIsLoading(false)
          }
        })
        .catch((error) => {
          console.log('[getConnectedDevices] Error: ' + error)
          console.error('[getConnectedDevices] Error: ', error)
        })
    } else {
      alert(
        'Your browser does not support media devices or getUserMedia.',
      )
    }
  }, [])

  const handleDeviceChange = (event) => {
    console.log('Selected device: ', event.target.value)
    playVideoFromCamera(event.target.value)
  }

  return (
    <>
      <h3>playground page!</h3>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <h3>Please select available device</h3>
          <select onChange={handleDeviceChange}>
            {devices.length > 0 ? (
              devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}{' '}
                </option>
              ))
            ) : (
              <option>No video devices found</option>
            )}
          </select>
          <video id={'localVideo'} autoPlay playsInline controls={false} />
        </>
      )}
    </>
  )
}

export default Playground
