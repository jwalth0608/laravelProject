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
				history.push('/list');
			});
	}
	
	const setNameValue = event => {
		setName(event.target.value);
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
				Email:
				<input type="text" value={name} onChange={setNameValue} />
				Password:
				<input type="text" value={password} onChange={setPasswordValue} />
				<button className='btn btn-primary btn-sm mb-3' onClick={submitLogin}> Login!</button>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	)
}

export default Login