import useRoutesElements from './hooks/useRoutesElements'

function App() {
  const routeElements = useRoutesElements()
  return <>{routeElements}</>
}

export default App
