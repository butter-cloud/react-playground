import {
  ChimeSDKMeetingsClient,
  CreateAttendeeCommand,
  CreateMeetingCommand,
} from '@aws-sdk/client-chime-sdk-meetings'
import * as AWS from 'aws-sdk'
import { useState } from 'react'
import {
  CameraSelection,
  LocalVideo,
  useLocalVideo,
  useMeetingManager,
  useVideoInputs,
  VideoTile,
  VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'

export const NewMeetingPage = () => {
  const [meetingResponse, setMeetingResponse] = useState(null)
  const [attendeeResponse, setAttendeeResponse] = useState(null)
  const [meetingId, setMeetingId] = useState('')

  const meetingManager = useMeetingManager()
  const { tileId, isVideoEnabled, toggleVideo } = useLocalVideo()

  const { devices, selectedDevice } = useVideoInputs()
  const items = devices.map((device) => (
    <li key={device.deviceId}>{device.label}</li>
  ))

  const client = new ChimeSDKMeetingsClient({
    region: 'ap-northeast-2',
    credentials: new AWS.Credentials(
      // TODO: AWS credentials 수정 필요
      '*',
      '*',
    ),
  })

  const handleCreateMeeting = async () => {
    const input = {
      ExternalMeetingId: 'new-meeting',
      MediaRegion: 'ap-northeast-2',
    }
    const command = new CreateMeetingCommand(input)
    const res = await client.send(command)
    console.log('res: ', res)
    setMeetingResponse(res)
    setMeetingId(res.Meeting.MeetingId)
  }

  const handleCreateAttendee = async () => {
    const input = {
      MeetingId: meetingId, // required
      ExternalUserId: 'new-user', // required
      Capabilities: {
        // 'SendReceive' || 'Send' || 'Receive' || 'None'
        Audio: 'SendReceive',
        Video: 'SendReceive',
        Content: 'SendReceive',
      },
    }

    const command = new CreateAttendeeCommand(input)
    const res = await client.send(command)
    console.log('res: ', res)
    setAttendeeResponse(res)
  }

  const handleJoinMeeting = async () => {
    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      meetingResponse.Meeting,
      attendeeResponse.Attendee,
    )

    const deviceLabels = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      return stream
    }

    const options = {
      deviceLabels,
    }

    await meetingManager.join(meetingSessionConfiguration, options)

    // TODO: device 관련 설정 수정 필요!

    const videoDevices = await meetingManager.audioVideo.listVideoInputDevices()
    console.log('videoDevices: ', videoDevices)

    await meetingManager.audioVideo.startVideoInput(videoDevices[0].deviceId)

    const localVideoTileNumber = meetingManager.audioVideo.startLocalVideoTile()
    console.log('localVideoTileNumber: ', localVideoTileNumber)

    meetingManager.audioVideo.bindVideoElement(
      localVideoTileNumber,
      document.getElementById('localVideoTile'),
    )

    const localVideoTile = meetingManager.audioVideo.getLocalVideoTile()
    console.log('localVideoTile: ', localVideoTile)

    await meetingManager.start()
  }

  const stopMeeting = async () => {
    await meetingManager.leave()
  }

  return (
    <>
      <h3>New Meeting Page</h3>
      <button onClick={handleCreateMeeting}>Create Meeting</button>
      <button onClick={handleCreateAttendee}>Create Attendee</button>
      <button onClick={handleJoinMeeting}>Join Meeting</button>
      <CameraSelection />
      <LocalVideo active={true} />
      <VideoTile
        id={'localVideoTile'}
        style={{
          border: '1px solid grey',
          gridArea: '',
          width: '300px',
          height: '200px',
        }}
        nameplate="Tile 1"
        tileId={1}
        active={true}
      />
      <VideoTileGrid />
      <p>Tile ID: {tileId}</p>
      <p>
        {isVideoEnabled ? 'LocalVideo is enabled' : 'LocalVideo is disabled'}
      </p>
      <button onClick={toggleVideo}>Toggle video</button>
      <button onClick={stopMeeting}>Stop Meeting</button>
      <div>
        <p>
          Current Selected Video Input Device: {JSON.stringify(selectedDevice)}
        </p>
        <p>Devices</p>
        <ul>{items}</ul>
      </div>
    </>
  )
}

export default NewMeetingPage
