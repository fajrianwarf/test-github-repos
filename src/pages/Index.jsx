import React from 'react';
import Input from '../components/Input';
import Table from '../components/Table';

export default function Index() {
	return (
		<div className='w-4/5 mx-auto '>
			<h1 className='my-8 text-4xl text-center'>
				Github API Search Repositories
			</h1>
			<div className='w-2/5'>
				<p className='text-gray-600'>Search</p>
				<Input />
			</div>
			<div className='mt-4'>
				<Table />
			</div>
		</div>
	);
}
