
    import axios from 'axios'
    import React, {useState, useEffect } from 'react'
    import { Link } from 'react-router-dom'

    const FilesList = ({}) => {
		const [files, setFiles] = useState([]);
		const [selectedFile, setSelectedFile] = useState(null);
		const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
		
		const logout = () => {
			localStorage.removeItem('user');
		}

		useEffect( () => {
			axios.get('/api/files', {headers: {
				'user': localStorage.getItem('user')
			}}).then(response => {
				setFiles(response.data);
			})
		}, []);
		
		const updateFile = event => {
			setSelectedFile(event.target.files[0]);
		}
		
		const uploadFile = () => {
			const formData = new FormData();
			
			formData.append(
				"uploadFile",
				selectedFile,
				selectedFile.name
			);
			
			axios.post('api/file', formData,{
				headers: {
				  'Content-Type': 'multipart/form-data',
				  'user': localStorage.getItem('user')
				}
			}).then(response => {
				setFiles([...files, response.data])
			});
			
		}

        return (
          <div className='container py-4'>
		  {user?.id > 0 &&
			<Link className='navbar-brand text-primary' onClick={logout} to='/'>{user?.name} Log out</Link>
		  }
            <div className='row justify-content-center'>
              <div className='col-md-8'>
                <div className='card'>
                  <div className='card-header'>All files</div>
                  <div className='card-body'>
					<input type="file" onChange={updateFile}/>
						{selectedFile && 
					<button className='btn btn-primary btn-sm mb-3' onClick={uploadFile}> Create New File</button>
						}
                    
                    <ul className='list-group list-group-flush'>
                      {files?.map(file => (
                        <Link
                          className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                          to={`/${file.id}`}
                          id={file.id}
                        >
                          {file.name}
                          <span className='badge badge-primary badge-pill'>
                            {file.tasks_count}
                          </span>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

    }

    export default FilesList