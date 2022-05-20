import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function Index() {
	const [username, setUsername] = useState('');
	const [data, setData] = useState([]);

	useEffect(() => {
		axios.get(`https://api.github.com/users/${username}/repos`).then((res) => {
			console.log(res.data);
			setData(res.data);
		});
	}, [username]);

	return (
		<div>
			<div>Search</div>
			<div>
				<input
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>
			<div>Table</div>
			<div>
				{data.map((item) => (
					<div>
						<div>
							<img src={item.owner.avatar_url} alt='github avatar' />
						</div>
						<a href={item.owner.url} target='_blank' rel='noreferrer'>
							Owner : {item.owner.login}
						</a>
						<div>{item.name}</div>
						<div>language: {item.language}</div>
						<div>{`license: ${
							item.license ? item.license : 'no license'
						}`}</div>
						<div>Repository : {`${item.private ? 'public' : 'private'}`}</div>
						<div>Visibility : {item.visibility}</div>
						<div>to repo : {item.url}</div>
						<div>created at : {item.created_at}</div>
						<div>updated at : {item.updated_at}</div>
					</div>
				))}
			</div>
		</div>
	);
}
