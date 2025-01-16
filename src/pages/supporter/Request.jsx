import axios from 'axios'

export default function Request() {
  const handleAccept = () => {
    console.log('수락')
    const supporterId = localStorage.getItem('supporterId')
    const clientId = localStorage.getItem('clientId')

    axios
      .post('http://localhost:8080/supporter/accept', null, {
        params: {
          supporterId: supporterId,
          clientId: clientId,
        },
      })
      .then((res) => {
        console.log(res)
      })
  }

  return (
    <>
      <h3>Request page!</h3>
      <h3>수락하시겠습니까?</h3>
      <button onClick={handleAccept}>수락</button>
    </>
  )
}
