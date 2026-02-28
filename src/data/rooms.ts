import { allItems } from './shows'

export interface MockRoom {
	id: string
	mediaId: number
	hostName: string
	roomName: string
	participants: string[]
	isPublic: boolean
}

const getMediaTitle = (id: number) => {
	const item = allItems.find((m) => m.id === id)
	return item ? item.title : 'Unknown Title'
}

export const mockRooms: MockRoom[] = [
	{
		id: 'room-abc-123',
		mediaId: 1,
		hostName: 'Awa',
		roomName: `${getMediaTitle(1)} Watch Party`,
		participants: ['Awa', 'Moussa', 'Fatou'],
		isPublic: true
	},
	{
		id: 'room-def-456',
		mediaId: 2,
		hostName: 'Moussa',
		roomName: `${getMediaTitle(2)} Live Discussion`,
		participants: ['Moussa', 'Awa'],
		isPublic: true
	},
	{
		id: 'room-ghi-789',
		mediaId: 3,
		hostName: 'Fatou',
		roomName: `${getMediaTitle(301)} - Movie Night`,
		participants: ['Fatou'],
		isPublic: false
	}
]
