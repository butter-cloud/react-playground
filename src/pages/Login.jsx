import axios from 'axios'
import { useState } from 'react'

export default function Login() {
  const [nickname, setNickname] = useState('')
  const [role, setRole] = useState('supporter')

  const handleLogin = () => {
    const data = {
      userName: nickname,
      role: role,
    }

    console.log('current data : ', data)

    axios
      .post('http://localhost:8080/login', data)
      .then((res) => {
        if (!res.data.success) {
          console.warn(res.data.message)
          alert("이미 사용중인 닉네임입니다. 다른 이름을 입력해주세요.")
          return
        }
        console.log(res.data.message)
        console.log(res.data.data)
        if (role == 'supporter'){
          localStorage.setItem('supporterId', JSON.stringify(res.data.data))
        } else {
          localStorage.setItem('clientId', JSON.stringify(res.data.data))
        }
        window.location.href = '/'
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      <h1>Login</h1>
      <label>Nickname</label>
      <input
        type={'text'}
        onChange={(e) => {
          setNickname(e.target.value)
        }}
      ></input>
      <br />
      <label>
        <input
          type="radio"
          value="supporter"
          checked={role === 'supporter'}
          onChange={() => setRole('supporter')}
        />
        Supporter
      </label>
      <label>
        <input
          type="radio"
          value="client"
          checked={role === 'client'}
          onChange={() => setRole('client')}
        />
        Client
      </label>
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </>
  )
}
