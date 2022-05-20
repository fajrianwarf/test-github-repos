import { AutoComplete } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContex } from '../App';

export default function Input() {
	const [username, setUsername] = useState('');
	const [search, setSearch] = useState([]);
	const { setData } = useContext(DataContex);

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
			setData(
				res.data.map((item, index) => ({
					key: index,
					owner: [item.owner.avatar_url, item.owner.url, item.owner.login],
					name: item.name,
					language: item.language,
					license: item.license,
					type: item.private,
					created_at: item.created_at,
					updated_at: item.updated_at,
				}))
			);
		});
	}, [username]);

	return (
		<AutoComplete
			value={username}
			style={{ width: 200 }}
			options={search}
			onSelect={(selected) => setUsername(selected)}
			onChange={(name) => setUsername(name)}
			placeholder='username'
		/>
	);
}
