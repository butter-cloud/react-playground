import { useEffect, useState } from 'react'
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
import {
  DeviceLabels,
  LocalVideo,
  useLocalVideo,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react'
import styled from 'styled-components'
import MeetingControlBar from '../../../../components/MeetingControlBar'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 80px; // control bar height
`
const LocalVideoWrapper = styled.div`
  video {
    width: 50vw;
    height: auto; /* height를 auto로 변경 */
    object-fit: cover;
  }
`

export const JoinMeetingPage = () => {
  const [meetingResponse, setMeetingReponse] = useState(null)
  const [attendeeResponse, setAttendeeResponse] = useState(null)

  const meetingManager = useMeetingManager()
  const { toggleVideo } = useLocalVideo()

  useEffect(() => {
    loadInfo()
  }, [])

  useEffect(() => {
    if (meetingResponse && attendeeResponse) {
      startMeeting()
    }
  }, [meetingResponse, attendeeResponse])

  const loadInfo = () => {
    const storedMeeting = localStorage.getItem('meeting')
    if (storedMeeting) {
      console.log('로컬스토리지에서 meeting 정보를 불러왔습니다')
      const meeting = JSON.parse(storedMeeting)
      console.log(meeting)
      setMeetingReponse(meeting)
    } else {
      console.warn('저장된 meeting 정보가 없습니다.')
    }

    const storedAttendee = localStorage.getItem('attendee')
    if (storedMeeting) {
      console.log('로컬스토리지에서 attendee 정보를 불러왔습니다')
      const attendee = JSON.parse(storedAttendee)
      console.log(attendee)
      setAttendeeResponse(attendee)
    } else {
      console.warn('저장된 attendee 정보가 없습니다.')
    }
  }

  const startMeeting = async () => {
    const meetingSessionConfiguration = new MeetingSessionConfiguration(
      meetingResponse,
      attendeeResponse,
    )

    console.log(attendeeResponse.attendeeId)

    const options = {
      deviceLabels: DeviceLabels.AudioAndVideo,
    }

    meetingManager.invokeDeviceProvider(DeviceLabels.AudioAndVideo)

    await meetingManager.join(meetingSessionConfiguration, options)

    await meetingManager.start()
  }

  const stopMeeting = async () => {
    await meetingManager.leave()
  }

  return (
    <>
      <MeetingControlBar
        toggleVideo={toggleVideo}
        stopMeeting={stopMeeting}
        style={{ display: 'absolute', top: '0' }}
      />
      <Wrapper>
        <LocalVideoWrapper>
          <LocalVideo />
        </LocalVideoWrapper>
      </Wrapper>
    </>
  )
}

export default JoinMeetingPage
