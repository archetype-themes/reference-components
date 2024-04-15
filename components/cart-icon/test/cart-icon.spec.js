import { test, expect } from '@playwright/test'
import { EVENTS } from '../../../scripts/utils/pubsub.js'

test('cart-icon', async ({ page }) => {
  // Given
  await page.goto('/')
  await page.getByRole('link', { name: 'cart-icon' }).click()
  let cartIcon = 5
  let data = { eventName: EVENTS.cartChange, options: { detail: { cart: { item_count: cartIcon } } } }
  // When
  await page.evaluate(
    ({ eventName, options }) =>
      Promise.resolve(setTimeout(() => document.dispatchEvent(new CustomEvent(eventName, options)), 300)),
    data
  )
  // Then
  await expect(page.locator('cart-count')).toContainText(cartIcon.toString())
})
