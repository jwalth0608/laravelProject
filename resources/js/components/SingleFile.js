import axios from 'axios'
import React, {  useState, useEffect } from 'react'

const SingleFile = (id) => {
	const [file, setFile] = useState({});
	useEffect(() => {
		axios.get(`/api/files${id?.location?.pathname}`).then(response => {
			setFile(response?.data);
		});
	}, [])


	return (
	  <div className='container py-4'>
		<div className='row justify-content-center'>
		  <div className='col-md-8'>
			<div className='card'>
			  <div className='card-header'>{file.name}</div>
			  <div className='card-body'>
				<img src={file.url}/>

				<hr />

			  </div>
			</div>
		  </div>
		</div>
	  </div>
	)
}

export default SingleFile