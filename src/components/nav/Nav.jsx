import heavenLandLogo from './heavenland.png'
import NavCSS from './Nav.module.css'

const Nav = () => {
  return (
    <nav className={NavCSS.container}>
      <img alt='Logo' src={heavenLandLogo} />
    </nav>
  )
}

export default Nav
