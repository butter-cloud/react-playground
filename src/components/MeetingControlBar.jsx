import {
  Camera,
  ControlBar,
  ControlBarButton,
  Laptop,
  Microphone,
  Phone,
} from 'amazon-chime-sdk-component-library-react'
import { useState } from 'react'
import styled from 'styled-components'

const StyledControlBar = styled(ControlBar)`
  // override to disable media query
  @media screen and (max-width: 35.5rem) {
    display: inline-flex;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 0px;
    background-color: rgb(255, 255, 255);
    opacity: 1;
    border: 0.03125rem solid rgb(228, 233, 242);
    box-shadow: none;
    flex-direction: row;
    width: 100%;
    top: 0px;
    position: fixed;
    height: 5rem;
  }
`
export const MeetingControlBar = ({ toggleVideo, stopMeeting }) => {
  const [muted, setMuted] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)

  const microphoneButtonProps = {
    icon: muted ? <Microphone muted /> : <Microphone />,
    onClick: () => setMuted(!muted),
    label: 'Mute',
  }

  const cameraButtonProps = {
    icon: cameraActive ? <Camera /> : <Camera disabled />,
    popOver: [
      {
        onClick: () => console.log('camera popover option 1'),
        children: <span>Some option text</span>,
      },
      {
        onClick: () => console.log('camera popover option 2'),
        children: <span>More option text</span>,
      },
    ],
    onClick: () => {
      toggleVideo()
      setCameraActive(!cameraActive)
    },
    label: 'Camera',
  }

  const hangUpButtonProps = {
    icon: <Phone />,
    onClick: () => {
      stopMeeting()
      console.log('End meeting')
    },
    label: 'End',
  }

  const laptopButtonProps = {
    icon: <Laptop />,
    onClick: () => console.log('Screen button clicked'),
    label: 'Screen',
  }

  return (
    <StyledControlBar showLabels layout={'top'}>
      <ControlBarButton {...microphoneButtonProps} />
      <ControlBarButton {...cameraButtonProps} />
      <ControlBarButton {...laptopButtonProps} />
      <ControlBarButton {...hangUpButtonProps} />
    </StyledControlBar>
  )
}

export default MeetingControlBar
