import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';

export default function Index() {
	const [username, setUsername] = useState('');
	const [data, setData] = useState([]);
	const [search, setSearch] = useState([]);

	useEffect(() => {
		if (username !== '') {
			axios
				.get(`https://api.github.com/search/users?q=${username}`)
				.then((res) => {
					setSearch(
						res.data.items
							.filter((item, index) => index < 5)
							.map((item) => ({ value: item.login }))
					);
				});
		}

		axios.get(`https://api.github.com/users/${username}/repos`).then((res) => {
			setData(res.data);
		});

		console.log(search);
	}, [username]);

	return (
		<div>
			<div>Search</div>
			<div>
				<AutoComplete
					value={username}
					style={{ width: 200 }}
					options={search}
					// onSearch={(selected) => setUsername(selected)}
					onSelect={(selected) => setUsername(selected)}
					onChange={(name) => setUsername(name)}
					placeholder='username'
				/>
				{/* <input
					type='text'
					className='bg-red-200'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/> */}
			</div>
			<div>Table</div>
			<div>
				{data.length === 0
					? 'no data'
					: data.map((item, i) => (
							<div key={i}>
								<div>
									<img src={item.owner.avatar_url} alt='github avatar' />
								</div>
								<a href={item.owner.url} target='_blank' rel='noreferrer'>
									Owner : {item.owner.login}
								</a>
								<div>{item.name}</div>
								<div>language: {item.language}</div>
								<div>{`license: ${
									item.license ? item.license.name : 'no license'
								}`}</div>
								<div>
									Repository : {`${item.private ? 'public' : 'private'}`}
								</div>
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
