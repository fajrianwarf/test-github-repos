import { AutoComplete } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { DataContex } from '../App';

export default function Input() {
	const { setData } = useContext(DataContex);
	const [username, setUsername] = useState(''); // use for the input username
	const [search, setSearch] = useState([]); // Use for debouncing search

	useEffect(() => {
		if (username !== '') {
			axios
				.get(`https://api.github.com/search/users?q=${username}`) // api for searching usernames
				.then((res) => {
					setSearch(
						res.data.items
							.filter((item, index) => index < 5) // limiting filter debouncing search to 5
							.map((item) => ({ value: item.login })) // mapping to an object
					);
				})
				.catch((err) => console.log(err));
		}

		axios
			.get(`https://api.github.com/users/${username}/repos`) // api for searching repositories
			.then((res) => {
				console.log(res.data);
				setData(
					res.data.map((item, index) =>
						// These data are returning an object that formatted for the antDesign table
						({
							key: index,
							owner: [item.owner.avatar_url, item.owner.login],
							name: [item.owner.login, item.name],
							language: item.language,
							license: item.license,
							type: item.private,
							created_at: item.created_at,
							updated_at: item.updated_at,
						})
					)
				);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [username]); // runs everytime username is changing

	return (
		<AutoComplete
			className='w-full'
			value={username}
			options={search}
			onSelect={(selected) => setUsername(selected)}
			onChange={(name) => setUsername(name)}
			placeholder='username'
		/>
	);
}
