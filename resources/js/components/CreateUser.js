import axios from 'axios'
import React, {  useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const CreateUser = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	
	const createUser = () => {
	axios.post('api/user', {
		'email': email,
		'password': password,
		'name': name
	}).then(response => {
				history.push('/');
			});
	}
	
	const setNameValue = event => {
		setName(event.target.value);
	}
	
	const setEmailValue = event => {
		setEmail(event.target.value);
	}

	const setPasswordValue = event => {
		setPassword(event.target.value);
	}
	return (
	  <div className='container py-4'>
		<div className='row justify-content-center'>
		  <div className='col-md-8'>
			<div className='card'>
			  <div className='card-header'>Login</div>
			  <div className='card-body'>
				<label for='name'>Name</label>
				<input class="form-control" type="text" id='name' value={name} onChange={setNameValue} />
				<label for='email'>Email</label>
				<input class="form-control" type="text" id='email' value={email} onChange={setEmailValue} />
				<label for='password'>Password</label>
				<input class="form-control" type="password" id='password' value={password} onChange={setPasswordValue} />
				<button className='btn btn-primary btn-sm mb-3' onClick={createUser}> Create User!</button>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	)
}

export default CreateUser