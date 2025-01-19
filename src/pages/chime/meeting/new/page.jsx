import {
  ChimeSDKMeetingsClient,
  CreateAttendeeCommand,
  CreateMeetingCommand,
} from '@aws-sdk/client-chime-sdk-meetings'
import * as AWS from 'aws-sdk'
import { useState } from 'react'
import {
  DeviceLabels,
  LocalVideo,
  useLocalVideo,
  useMeetingManager,
  VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'

export const NewMeetingPage = () => {
  const [meetingResponse, setMeetingResponse] = useState(null)
  const [attendeeResponse, setAttendeeResponse] = useState(null)
  const [meetingId, setMeetingId] = useState('')
  const { toggleVideo } = useLocalVideo()

  const meetingManager = useMeetingManager()

  const client = new ChimeSDKMeetingsClient({
    region: 'ap-northeast-2',
    credentials: new AWS.Credentials(
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
    const options = {
      deviceLabels: DeviceLabels.AudioAndVideo,
    }

    meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo)

    await meetingManager.join(meetingSessionConfiguration, options)
    await meetingManager.start()
  }

  const handleStopMeeting = async () => {
    await meetingManager.leave()
  }

  return (
    <>
      <h3>New Meeting Page</h3>
      <button onClick={handleCreateMeeting}>Create Meeting</button>
      <button onClick={handleCreateAttendee}>Create Attendee</button>
      <button onClick={handleJoinMeeting}>Join Meeting</button>
      <button onClick={handleStopMeeting}>Stop Meeting</button>
      <LocalVideo style={{ width: '500px' }} />
      <button onClick={toggleVideo}>toggle video</button>
    </>
  )
}

export default NewMeetingPage
