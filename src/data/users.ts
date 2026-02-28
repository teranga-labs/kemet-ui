import type { User } from '../app/contexts/AuthContext'
import type { Profile } from '../app/contexts/ProfileContext'

export interface MockUser extends User {
	password_plaintext: string
	subscriptionPlan: 'daily' | 'weekly' | 'monthly' | null
	profiles: Profile[]
	role: 'admin' | 'creator' | 'viewer'
}

export const mockUsers: MockUser[] = [
	{
		id: 'user-001',
		name: 'Awa Gueye',
		email: 'daily@kemet.com',
		password_plaintext: 'password123',
		subscriptionPlan: 'daily',
		role: 'admin',
		profiles: [
			{
				id: 'p-01a',
				name: 'Awa',
				avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Luna'
			},
			{
				id: 'p-01b',
				name: 'Kids',
				avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Luna',
				isKid: true
			}
		]
	},
	{
		id: 'user-002',
		name: 'Moussa Diop',
		email: 'weekly@kemet.com',
		password_plaintext: 'password123',
		subscriptionPlan: 'weekly',
		role: 'creator',
		profiles: [
			{
				id: 'p-02a',
				name: 'Moussa',
				avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Luna'
			}
		]
	},
	{
		id: 'user-003',
		name: 'Fatou Sow',
		email: 'free@kemet.com',
		password_plaintext: 'password123',
		subscriptionPlan: null,
		role: 'viewer',
		profiles: [
			{
				id: 'p-03a',
				name: 'Fatou',
				avatar: 'https://api.dicebear.com/8.x/lorelei/svg?seed=Luna'
			}
		]
	}
]
