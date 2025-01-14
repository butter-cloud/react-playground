export async function getConnectedDevices(type) {
  const devices = await navigator.mediaDevices.enumerateDevices()

  if (type === 'all') {
    return devices
  }
  return devices.filter((device) => device.kind === type)
}

export async function playVideoFromCamera(deviceId) {
  console.log('Play video from camera using - ', deviceId)

  const constraints = {
    video: { deviceId: { exact: deviceId } },
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log('Camera stream:', stream)
    const videoElement = document.querySelector('video#localVideo')
    videoElement.srcObject = stream
  } catch (error) {
    console.error('[playVideoFromCamera] Error: ', error)
  }
}
