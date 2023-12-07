import Login from '../login/Register'
import MainCss from './Main.module.css'

const Main = () => {
  return (
    <div className={MainCss.content}>
      <Login />
    </div>
  )
}
export default Main
