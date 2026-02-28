import { expect, test } from '@playwright/test'

import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/')
	})

	test('navigates to signin page', async ({ page }) => {
		await page.click('text=SIGN IN')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})

	test('navigates to signup page', async ({ page }) => {
		await page.click('text=SIGN UP')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})

	test('navigates to movies page', async ({ page }) => {
		await page.click('text=MOVIES')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})

	test('navigates to shows page', async ({ page }) => {
		await page.click('text=SHOWS')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})

	test('navigates to live page', async ({ page }) => {
		await page.click('text=LIVE')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})

	test('navigates to documentaries page', async ({ page }) => {
		await page.click('text=DOCUMENTARIES')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})

	test('navigates to watch party page', async ({ page }) => {
		await page.click('text=WATCH PARTY')
		await expect(page).toHaveTitle('Kemet, a Cinematic Revolution')
	})
})
