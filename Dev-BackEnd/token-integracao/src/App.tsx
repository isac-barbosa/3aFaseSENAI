import { useEffect, useState } from 'react'
import { Login } from './Login'
import { Registrar } from './Registrar';
import { Home } from './Home';

function App() {
  const [dataLogin, setDataLogin] = useState<any>(null);
  const [registrar, setRegistrar] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("tokenAcesso")
    const refreshToken = localStorage.getItem("tokenRefresh")
    const hasTokens = accessToken && refreshToken
    if (hasTokens) {
      setDataLogin({
        accessToken,
        refreshToken
      })
    }
  }, [])

  return (
    <>
      {dataLogin !== null ? <Home setDataLogin={setDataLogin} /> : registrar ?
        <Registrar setRegistrar={setRegistrar} />
        :
        <Login
          setDataLogin={setDataLogin}
          setRegistrar={setRegistrar}
        />

      }

    </>
  )
}

export default App
