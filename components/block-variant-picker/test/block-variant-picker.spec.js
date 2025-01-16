import { test, expect } from '@playwright/test'
import { EVENTS } from 'pubsub'

test('block-variant-picker', async ({ page }) => {
  // Given
  await page.goto('/')
  await page.getByRole('link', { name: 'block-variant-picker' }).click()
  await page.waitForLoadState()
  let eventPromise = page.evaluate((eventName) => {
    return new Promise((resolve) => document.addEventListener(eventName, (event) => resolve(event)))
  }, EVENTS.variantChange)
  let radio = await page.getByRole('radio', { checked: false }).first()
  let text = await radio.getAttribute('value')
  let label = await page.getByText(text)
  // When
  await label.click()
  // Then
  expect(await eventPromise).toBeTruthy()
})
