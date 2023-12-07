import Main from './components/main/Main'
import Nav from './components/nav/Nav'

const App = () => {
  return (
    <div className='d-flex flex-column vh-100'>
      <Nav />
      <Main />
    </div>
  )
}

export default App
