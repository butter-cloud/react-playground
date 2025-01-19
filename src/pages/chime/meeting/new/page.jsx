import {
  ChimeSDKMeetingsClient,
  CreateAttendeeCommand,
  CreateMeetingCommand,
} from '@aws-sdk/client-chime-sdk-meetings'
import * as AWS from 'aws-sdk'
import { useState } from 'react'

export const NewMeetingPage = () => {
  const [meetingId, setMeetingId] = useState(null)

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

    localStorage.setItem('meeting', JSON.stringify(res.Meeting))
    console.log('로컬스토리지에 meeting 정보를 저장했습니다.')

    setMeetingId(res.Meeting.MeetingId)
  }

  const handleCreateAttendee = async () => {
    const randomString = Math.random().toString(36).substring(2, 8);

    const input = {
      MeetingId: meetingId, // required
      ExternalUserId: `user-${randomString}`, // required
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

    localStorage.setItem('attendee', JSON.stringify(res.Attendee))
    console.log('로컬스토리지에 attendee 정보를 저장했습니다.')
  }

  const joinMeeting = () => {
    const width = 400 // 팝업의 가로 길이
    const height = 600 // 팝업의 세로 길이

    // 팝업을 부모 브라우저의 정 중앙에 위치시킨다.
    const left = window.screenX + (window.outerWidth - width) / 2
    const top = window.screenY + (window.outerHeight - height) / 2

    window.open(
      '/chime/meeting/join',
      `New meeting session ${Date.now()}`,
      `width=${width},height=${height},left=${left},top=${top}`,
    )
  }

  return (
    <>
      <h3>New Meeting Page</h3>
      <button onClick={handleCreateMeeting}>Create Meeting</button>
      <button onClick={handleCreateAttendee}>Create Attendee</button>
      <button onClick={joinMeeting}>Join Meeting</button>
    </>
  )
}

export default NewMeetingPage
