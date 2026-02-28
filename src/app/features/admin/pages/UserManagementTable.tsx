import { Plus, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { mockUsers } from '../../../../data/users.ts'

type User = (typeof mockUsers)[0]

type UserFormData = Omit<
	User,
	'subscriptionPlan' | 'id' | 'profiles' | 'password_plaintext'
> & {
	password?: string
	subscriptionPlan: 'none' | 'daily' | 'weekly' | 'monthly'
}

const UserManagementTable = () => {
	const [users, setUsers] = useState<User[]>(mockUsers)

	const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false)
	const [newUser, setNewUser] = useState({
		name: '',
		email: '',
		password: '',
		role: 'viewer' as 'viewer' | 'admin' | 'creator',
		subscriptionPlan: 'none' as 'none' | 'daily' | 'weekly' | 'monthly'
	})

	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [editingUser, setEditingUser] = useState<User | null>(null)
	const [editFormData, setEditFormData] = useState<Partial<UserFormData>>({})

	const [searchQuery, setSearchQuery] = useState('')
	const [filteredUsers, setFilteredUsers] = useState<User[]>(users)

	useEffect(() => {
		const lowercasedQuery = searchQuery.toLowerCase()

		if (!lowercasedQuery) {
			setFilteredUsers(users)
			return
		}

		const filtered = users.filter(
			(user) =>
				user.name.toLowerCase().includes(lowercasedQuery) ||
				user.email.toLowerCase().includes(lowercasedQuery) ||
				user.role.toLowerCase().includes(lowercasedQuery) ||
				(user.subscriptionPlan || 'none')
					.toLowerCase()
					.includes(lowercasedQuery)
		)

		setFilteredUsers(filtered)
	}, [searchQuery, users])

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setNewUser((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const handleAddUser = (e: React.FormEvent) => {
		e.preventDefault()

		const createdUser: User = {
			id: `user-${Date.now()}`,
			password_plaintext: newUser.password,
			profiles: [
				{
					id: `p-${Date.now()}`,
					name: newUser.name.split(' ')[0],
					avatar: `https://i.pravatar.cc/150?u=p-${Date.now()}`
				}
			],
			...newUser,
			subscriptionPlan:
				newUser.subscriptionPlan === 'none' ? null : newUser.subscriptionPlan
		}

		setUsers((prevUsers) => [...prevUsers, createdUser])
		alert(`User ${newUser.name} added successfully!`)

		setNewUser({
			name: '',
			email: '',
			password: '',
			role: 'viewer',
			subscriptionPlan: 'none'
		})
		setIsAddUserModalOpen(false)
	}

	const handleDeleteUser = (userId: string) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
			alert('User deleted successfully.')
		}
	}

	const handleOpenEditModal = (user: User) => {
		setEditingUser(user)
		setEditFormData({
			name: user.name,
			email: user.email,
			role: user.role,
			subscriptionPlan: user.subscriptionPlan || 'none',
			password: ''
		})
		setIsEditModalOpen(true)
	}

	const handleEditFormChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setEditFormData((prev) => ({
			...prev,
			[name]: value
		}))
	}

	const handleUpdateUser = (e: React.FormEvent) => {
		e.preventDefault()
		if (!editingUser) return

		setUsers((prevUsers) =>
			prevUsers.map((user) => {
				if (user.id === editingUser.id) {
					const updatedUser = {
						...user,
						name: editFormData.name || user.name,
						email: editFormData.email || user.email,
						role: editFormData.role || user.role,
						subscriptionPlan:
							editFormData.subscriptionPlan === 'none'
								? null
								: editFormData.subscriptionPlan || user.subscriptionPlan
					}
					if (editFormData.password) {
						updatedUser.password_plaintext = editFormData.password
					}
					return updatedUser
				}
				return user
			})
		)

		alert(`User ${editFormData.name} updated successfully!`)
		setIsEditModalOpen(false)
		setEditingUser(null)
		setEditFormData({})
	}

	return (
		<div>
			<div className='mb-4 flex flex-col items-center justify-between gap-4 sm:flex-row'>
				<h2 className='w-full text-2xl font-semibold text-gray-900 sm:w-auto dark:text-white'>
					User Management <span className='text-purple-700'>.</span>
				</h2>
				<div className='flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row'>
					<div className='relative w-full sm:w-auto'>
						<Search
							size={20}
							className='pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400'
						/>
						<input
							type='text'
							placeholder='Search users...'
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className='w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:w-64 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
						/>
					</div>
					<button
						onClick={() => setIsAddUserModalOpen(true)}
						className='flex w-full items-center justify-center space-x-2 rounded-lg bg-purple-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-purple-700 sm:w-auto'
					>
						<Plus size={20} />
						<span className='hidden sm:inline'>Add User</span>
					</button>
				</div>
			</div>

			{isAddUserModalOpen && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
					<div className='w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900'>
						<div className='flex items-center justify-between border-b p-6 dark:border-zinc-800'>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
								Add New User
							</h3>
							<button
								onClick={() => setIsAddUserModalOpen(false)}
								className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
							>
								<X size={24} />
							</button>
						</div>
						<form onSubmit={handleAddUser} className='space-y-4 p-6'>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Name *
								</label>
								<input
									type='text'
									name='name'
									value={newUser.name}
									onChange={handleInputChange}
									required
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Email *
								</label>
								<input
									type='email'
									name='email'
									value={newUser.email}
									onChange={handleInputChange}
									required
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Password *
								</label>
								<input
									type='password'
									name='password'
									value={newUser.password}
									onChange={handleInputChange}
									required
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Role *
								</label>
								<select
									name='role'
									value={newUser.role}
									onChange={handleInputChange}
									className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								>
									<option value='viewer'>Viewer</option>
									<option value='admin'>Admin</option>
									<option value='creator'>Creator</option>
								</select>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Subscription Plan
								</label>
								<select
									name='subscriptionPlan'
									value={newUser.subscriptionPlan}
									onChange={handleInputChange}
									className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								>
									<option value='none'>None</option>
									<option value='daily'>Daily</option>
									<option value='weekly'>Weekly</option>
									<option value='monthly'>Monthly</option>
								</select>
							</div>
							<div className='flex justify-end space-x-3 pt-4'>
								<button
									type='button'
									onClick={() => setIsAddUserModalOpen(false)}
									className='rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700'
								>
									Add User
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			{isEditModalOpen && editingUser && (
				<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'>
					<div className='w-full max-w-md rounded-lg border border-gray-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900'>
						<div className='flex items-center justify-between border-b p-6 dark:border-zinc-800'>
							<h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
								Edit User
							</h3>
							<button
								onClick={() => setIsEditModalOpen(false)}
								className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
							>
								<X size={24} />
							</button>
						</div>
						<form onSubmit={handleUpdateUser} className='space-y-4 p-6'>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Name *
								</label>
								<input
									type='text'
									name='name'
									value={editFormData.name}
									onChange={handleEditFormChange}
									required
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Email *
								</label>
								<input
									type='email'
									name='email'
									value={editFormData.email}
									onChange={handleEditFormChange}
									required
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Password
								</label>
								<input
									type='password'
									name='password'
									value={editFormData.password}
									onChange={handleEditFormChange}
									placeholder='Leave blank to keep unchanged'
									className='w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								/>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Role *
								</label>
								<select
									name='role'
									value={editFormData.role}
									onChange={handleEditFormChange}
									className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								>
									<option value='viewer'>Viewer</option>
									<option value='admin'>Admin</option>
									<option value='creator'>Creator</option>
								</select>
							</div>
							<div>
								<label className='mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300'>
									Subscription Plan
								</label>
								<select
									name='subscriptionPlan'
									value={editFormData.subscriptionPlan}
									onChange={handleEditFormChange}
									className='h-13 w-full rounded-md border border-gray-300 bg-white p-3 text-black shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white'
								>
									<option value='none'>None</option>
									<option value='daily'>Daily</option>
									<option value='weekly'>Weekly</option>
									<option value='monthly'>Monthly</option>
								</select>
							</div>
							<div className='flex justify-end space-x-3 pt-4'>
								<button
									type='button'
									onClick={() => setIsEditModalOpen(false)}
									className='rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 dark:border-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-800'
								>
									Cancel
								</button>
								<button
									type='submit'
									className='rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700'
								>
									Save Changes
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div className='overflow-x-auto rounded-lg bg-white shadow dark:bg-zinc-900'>
				<table className='min-w-full'>
					<thead className='bg-purple-700 text-left text-sm font-semibold text-white'>
						<tr>
							<th className='p-4'>Name</th>
							<th className='p-4'>Email</th>
							<th className='p-4'>Role</th>
							<th className='p-4'>Subscription</th>
							<th className='p-4 text-right'>Actions</th>
						</tr>
					</thead>
					<tbody className='text-gray-800 dark:text-gray-200'>
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user) => (
								<tr
									key={user.id}
									className='border-t border-gray-200 hover:bg-gray-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50'
								>
									<td className='p-4'>{user.name}</td>
									<td className='p-4'>{user.email}</td>
									<td className='p-4 capitalize'>{user.role}</td>
									<td className='p-4 capitalize'>
										{user.subscriptionPlan || 'None'}
									</td>
									<td className='space-x-4 p-4 text-right'>
										<button
											onClick={() => handleOpenEditModal(user)}
											className='font-medium text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300'
										>
											Edit
										</button>
										<button
											onClick={() => handleDeleteUser(user.id)}
											className='font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={5}
									className='p-6 text-center text-gray-500 dark:text-gray-400'
								>
									No users found matching your search.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UserManagementTable
