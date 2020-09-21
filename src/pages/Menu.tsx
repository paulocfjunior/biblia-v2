import React from 'react'
import { Link } from 'react-router-dom'

const Menu: React.FC = () => (
  <div>
    <Link to="/control">Control</Link>
    <Link to="/verse">Verse</Link>
  </div>
)

export default Menu
