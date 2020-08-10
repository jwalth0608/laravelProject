import axios from 'axios'
import React, {  useState, useEffect } from 'react'
import ReactPlayer from 'react-player';
import Select from 'react-select';
import { Link } from 'react-router-dom'





const SingleFile = (id) => {
	const [file, setFile] = useState({});
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState({});
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

	useEffect(() => {
		axios.get(`/api/files${id?.location?.pathname}`).then(response => {
			setFile(response?.data);
		});
		axios.get('/api/users', {headers: {
				'user': localStorage.getItem('user')
			}}).then(response => {
			setUsers(response?.data);
		})
	}, [])
	
	const logout = () => {
		localStorage.removeItem('user');
	}
	
	const share = () => {
		axios.put(`/api/files/${selectedUser.value}/${file.id}`).then(response => {
			console.log('shared filed with user');
		});
	}

	const selectChanged = ev => {
		setSelectedUser(ev);
	}

	return (
	  <div className='container py-4'>
	  {user?.id > 0 &&
			<Link className='navbar-brand text-primary' onClick={logout} to='/'>{user?.name} Log out</Link>
		  }
		<div className='row justify-content-center'>
		  <div className='col-md-8'>
			<div className='card'>
			  <div className='card-header'>{file.name}</div>
			  <div className='card-body'>
			  {file.type === 'image' &&
				<img src={file.url}/>
			  }
			  {file.type === 'video' &&
			  <ReactPlayer url={file.url} controls={true}/>}
				<hr />
			  </div>
			</div>
			<div className='card'>
				<div className='card-body'>
				<Select
					defaultValue={selectedUser.label}
					options={users.map(u => {return {value: u.id, label:u.name}})}
					onChange={selectChanged}
				/>
				
				<button className='btn btn-primary btn-sm mb-3' onClick={share}>Share!</button>
				</div>
			</div>
		  </div>
		</div>
	  </div>
	)
}

export default SingleFile