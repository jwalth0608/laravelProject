
    import React from 'react'
    import { Link } from 'react-router-dom'
	
	const user = JSON.parse(localStorage.getItem('user'))


    const Header = () => (
      <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
          <Link className='navbar-brand' to='/list'>FileUploader</Link>
		  
		  
        </div>
      </nav>
    )

    export default Header