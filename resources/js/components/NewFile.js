// resources/assets/js/components/Newfile.js

import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Newfile = ({}) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleFieldChange = (event) => {
	setName(event.target.value);
  }

  const handleCreateNewfile = (event) => {
	event.preventDefault()

	const { history } = this.props

	const file = {
	  name
	}

	axios.post('/api/files', file)
	  .then(response => {
		// redirect to the homepage
		history.push('/')
	  })
	  .catch(error => {
		this.setState({
		  errors: error.response.data.errors
		})
	  })
  }


  const renderErrorFor =(field) => {
	if (this.hasErrorFor(field)) {
	  return (
		<span className='invalid-feedback'>
		  <strong>{this.state.errors[field][0]}</strong>
		</span>
	  )
	}
  }

	return (
	  <div className='container py-4'>
		<div className='row justify-content-center'>
		  <div className='col-md-6'>
			<div className='card'>
			  <div className='card-header'>Create new file</div>
			  <div className='card-body'>
				<form onSubmit={handleCreateNewfile}>
				  <div className='form-group'>
					<label htmlFor='name'>file name</label>
					<input
					  id='name'
					  type='text'
					  className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
					  name='name'
					  value={name}
					  onChange={setName}
					/>
					{this.renderErrorFor('name')}
				  </div>
				  <button className='btn btn-primary'>Create</button>
				</form>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	)
};

export default Newfile