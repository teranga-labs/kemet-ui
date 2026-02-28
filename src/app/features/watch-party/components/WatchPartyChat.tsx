import { MessageSquare, Send } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface WatchPartyChatProps {
	roomId: string
}

interface ChatMessage {
	id: string
	user: string
	text: string
	timestamp: number
}

function WatchPartyChat({ roomId }: WatchPartyChatProps) {
	const { t } = useTranslation()

	// Mock messages can also be translated for a better demo
	const initialMockMessages: ChatMessage[] = [
		{
			id: '1',
			user: 'Awa',
			text: t('watchParty.chat.mockMessage1'),
			timestamp: Date.now() - 30000
		},
		{
			id: '2',
			user: 'Moussa',
			text: t('watchParty.chat.mockMessage2'),
			timestamp: Date.now() - 20000
		},
		{
			id: '3',
			user: 'Fatou',
			text: t('watchParty.chat.mockMessage3'),
			timestamp: Date.now() - 10000
		}
	]

	const [messages, setMessages] = useState<ChatMessage[]>(initialMockMessages)
	const [newMessage, setNewMessage] = useState('')

	const handleSendMessage = (e: React.FormEvent) => {
		e.preventDefault()
		if (newMessage.trim()) {
			const message = {
				id: Date.now().toString(),
				user: t('watchParty.chat.currentUser'),
				text: newMessage,
				timestamp: Date.now()
			}
			setMessages([...messages, message])
			setNewMessage('')

			console.log(`Sending message to room ${roomId}: ${newMessage}`)
		}
	}

	return (
		<div className='flex h-full flex-col rounded-lg border border-gray-200 bg-white/95 shadow-lg backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900'>
			<div className='flex items-center space-x-2 border-b border-gray-200 p-4 dark:border-zinc-800'>
				<MessageSquare
					size={20}
					className='text-purple-600 dark:text-purple-400'
				/>
				<h2 className='text-lg font-bold text-gray-800 dark:text-gray-100'>
					{t('watchParty.chat.title')}
				</h2>
				<span className='rounded bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-zinc-700 dark:text-gray-400'>
					{t('watchParty.chat.roomLabel')} {roomId}
				</span>
			</div>

			<div className='custom-scrollbar flex-grow space-y-4 overflow-y-auto p-4'>
				{messages.map((msg) => (
					<div key={msg.id} className='flex items-start space-x-3'>
						<span className='flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-xs font-semibold text-white'>
							{msg.user[0]}
						</span>
						<div className='flex-1'>
							<span className='text-sm font-semibold text-gray-900 dark:text-gray-100'>
								{msg.user}
							</span>
							<p className='text-sm break-words text-gray-700 dark:text-gray-300'>
								{msg.text}
							</p>
						</div>
					</div>
				))}
			</div>

			<form
				onSubmit={handleSendMessage}
				className='flex space-x-2 border-t border-gray-200 p-4 dark:border-zinc-800'
			>
				<input
					type='text'
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					placeholder={t('watchParty.chat.placeholder')}
					className='flex-grow rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 text-black placeholder-gray-500 transition-colors focus:ring-2 focus:ring-purple-600 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400 dark:focus:ring-purple-500'
				/>
				<button
					type='submit'
					className='rounded-lg bg-purple-600 p-2 text-white transition-colors hover:bg-purple-700 disabled:opacity-50'
					disabled={!newMessage.trim()}
				>
					<Send size={20} />
				</button>
			</form>
		</div>
	)
}

export default WatchPartyChat
