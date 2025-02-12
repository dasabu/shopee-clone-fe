import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRoutesElements from './hooks/useRoutesElements'

function App() {
  const routeElements = useRoutesElements()
  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
