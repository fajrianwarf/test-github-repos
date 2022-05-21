import React, { useContext } from 'react';
import { Table as TableAntd } from 'antd';
import { DataContex } from '../App';

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

// data column for ant design table
const columns = [
	{
		title: 'Owner',
		dataIndex: 'owner',
		key: 'owner',
		render: (item) => (
			<div className='flex items-center gap-x-2'>
				<a
					href={`https://github.com/${item[1]}`}
					target='_blank'
					rel='noreferrer'
				>
					<img src={item[0]} alt='github avatar' className='w-8 h-8' />
				</a>
				<a
					href={`https://github.com/${item[1]}`}
					target='_blank'
					rel='noreferrer'
				>
					{item[1]}
				</a>
			</div>
		),
	},
	{
		title: "Repository's Name",
		dataIndex: 'name',
		key: 'name',
		render: (item) => (
			<a
				href={`https://github.com/${item[0]}/${item[1]}`}
				target='_blank'
				rel='noreferrer'
			>
				{item[1]}
			</a>
		),
	},
	{
		title: 'Language',
		dataIndex: 'language',
		key: 'language',
		render: (text) => <div>{text ? text : '-'}</div>,
	},
	{
		title: 'License',
		dataIndex: 'license',
		key: 'license',
		render: (text) => <div>{text ? text.name : '-'}</div>,
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
		render: (text) => <div>{!text ? 'Public' : 'Private'}</div>,
	},
	{
		title: 'Created At',
		dataIndex: 'created_at',
		key: 'created_at',
		render: (date) => <div>{getLocalDate(date)}</div>,
	},
	{
		title: 'Updated At',
		dataIndex: 'updated_at',
		key: 'updated_at',
		render: (date) => <div>{getLocalDate(date)}</div>,
	},
];

export default function Table() {
	const { data } = useContext(DataContex);

	return <TableAntd columns={columns} dataSource={data} />;
}
