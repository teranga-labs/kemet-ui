import { Users } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Footer from '../../../components/layout/Footer.tsx'
import Header from '../../../components/layout/Header.tsx'
import { mockRooms } from '../../../../data/rooms.ts'
import { allItems } from '../../../../data/shows.ts'

function WatchPartyJoinPage() {
	const { t } = useTranslation()
	const [roomId, setRoomId] = useState('')
	const navigate = useNavigate()

	const handleJoin = (id: string) => {
		const room = mockRooms.find((r) => r.id === id)
		if (room) {
			navigate(`/watch-party/room/${id}`)
		} else {
			alert(t('watchParty.join.roomNotFoundAlert'))
		}
	}

	const handleManualJoin = (e: React.FormEvent) => {
		e.preventDefault()
		if (roomId.trim()) {
			handleJoin(roomId)
		}
	}

	const publicRooms = mockRooms.filter((room) => room.isPublic)

	return (
		<div className='flex min-h-screen flex-col bg-white dark:bg-zinc-900'>
			<Header />
			<main className='container mx-auto mt-8 mb-6 flex-1 px-4 pt-24 sm:px-6 lg:px-8'>
				<h1 className='mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white'>
					{t('watchParty.join.title')}
				</h1>

				<div className='mx-auto mb-12 max-w-md'>
					<form onSubmit={handleManualJoin} className='flex space-x-2'>
						<input
							type='text'
							value={roomId}
							onChange={(e) => setRoomId(e.target.value)}
							placeholder={t('watchParty.join.enterRoomPlaceholder')}
							className='flex-grow rounded-lg border-2 border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder-gray-500 transition-colors focus:border-purple-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-gray-200 dark:placeholder-gray-400 dark:focus:border-purple-500'
						/>
						<button
							type='submit'
							className='rounded-lg bg-purple-600 px-6 py-3 font-bold text-white transition-colors hover:bg-purple-700 disabled:opacity-50'
							disabled={!roomId.trim()}
						>
							{t('watchParty.join.joinButton')}
						</button>
					</form>
				</div>

				{publicRooms.length > 0 && (
					<div>
						<h2 className='mb-4 text-2xl font-bold text-gray-900 dark:text-white'>
							{t('watchParty.join.publicRoomsTitle')}
						</h2>
						<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
							{publicRooms.map((room) => {
								const mediaItem = allItems.find(
									(item) => item.id === room.mediaId
								)
								return (
									<div
										key={room.id}
										className='cursor-pointer rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-md transition-colors hover:bg-gray-100 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700'
										onClick={() => handleJoin(room.id)}
									>
										<div className='mb-2 flex items-center'>
											<Users
												size={20}
												className='mr-2 text-purple-600 dark:text-purple-400'
											/>
											<h3 className='truncate text-lg font-bold text-gray-900 dark:text-white'>
												{room.roomName}
											</h3>
										</div>
										{mediaItem && (
											<p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
												{t('watchParty.join.watchingLabel')} {mediaItem.title} (
												{mediaItem.year})
											</p>
										)}
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											{t('watchParty.join.hostLabel')} {room.hostName}
										</p>
										<p className='text-sm text-gray-700 dark:text-gray-300'>
											{t('watchParty.join.participantsLabel')}{' '}
											{room.participants.length}
										</p>
									</div>
								)
							})}
						</div>
					</div>
				)}
			</main>
			<Footer />
		</div>
	)
}

export default WatchPartyJoinPage
