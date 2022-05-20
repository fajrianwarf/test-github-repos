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

export default function Table() {
	const { data } = useContext(DataContex);

	return <TableAntd columns={columns} dataSource={data} />;
}
