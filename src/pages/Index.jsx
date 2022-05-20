import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AutoComplete, Table } from 'antd';

function getLocalDate(date) {
	const inputDate = new Date(date);
	const newDate = new Intl.DateTimeFormat('en-ID', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
	}).format(inputDate);
	const hour = new Intl.DateTimeFormat('en-ID', { timeStyle: 'long' }).format(
		inputDate
	);
	return `${newDate} ${hour}`;
}

const columns = [
	{
		title: 'owner',
		dataIndex: 'owner',
		key: 'owner',
		render: (item) => (
			<div className='flex items-center gap-x-2'>
				<img src={item[0]} alt='github avatar' className='w-8 h-8' />
				<a href={item[1]} target='_blank' rel='noreferrer'>
					{item[2]}
				</a>
			</div>
		),
	},
	{
		title: 'name',
		dataIndex: 'name',
		key: 'name',
		render: (text) => <div>{text}</div>,
	},
	{
		title: 'language',
		dataIndex: 'language',
		key: 'language',
		render: (text) => <div>{text ? text : '-'}</div>,
	},
	{
		title: 'license',
		dataIndex: 'license',
		key: 'license',
		render: (text) => <div>{text ? text.name : '-'}</div>,
	},
	{
		title: 'type',
		dataIndex: 'type',
		key: 'type',
		render: (text) => <div>{!text ? 'Public' : 'Private'}</div>,
	},
	{
		title: 'created at',
		dataIndex: 'created_at',
		key: 'created_at',
		render: (date) => <div>{getLocalDate(date)}</div>,
	},
	{
		title: 'updated at',
		dataIndex: 'updated_at',
		key: 'updated_at',
		render: (date) => <div>{getLocalDate(date)}</div>,
	},
];

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
		console.log(data);
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
			{/* <div>
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
			</div> */}
			<div>
				<Table columns={columns} dataSource={data} />
			</div>
		</div>
	);
}
