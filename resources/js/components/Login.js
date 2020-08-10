import axios from 'axios'
import React, {  useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


const Login = () => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();
	
	const submitLogin = () => {
	axios.post('api/login', {
		'email': name,
		'password': password
	}).then(response => {
		localStorage.setItem('user', JSON.stringify(response.data));
				history.push('/list');
			});
	}
	
	const setNameValue = event => {
		setName(event.target.value);
	}

	const setPasswordValue = event => {
		setPassword(event.target.value);
	}
	
	const goToCreate = () => {
		history.push('/newUser')
	}
	return (
	  <div className='container py-4'>
		<div className='row justify-content-center'>
		  <div className='col-md-8'>
			<div className='card'>
			  <div className='card-header'>Login</div>
			  <div className='d-block card-body'>
				<div>
				<label for="user-name">Email</label>
				<input class="form-control" value={name} id="user-name" onChange={setNameValue} />
				</div>
				<div>
				<label for="password">Password</label>
<input class="form-control" id="password" type="password" value={password} onChange={setPasswordValue} />
				</div>
				<div>
					<button className='btn btn-primary btn-sm mb-3' onClick={submitLogin}> Login!</button>
					<br/>
					<button className='btn btn-primary btn-sm mb-3' onClick={goToCreate}> Create New User!</button>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	)
}

export default Login