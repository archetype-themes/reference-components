import { test, expect } from "@playwright/test"
import { EVENTS } from "../../../scripts/utils/pubsub.js"

test("block-variant-picker", async ({ page }) => {
  // Given
  await page.goto("https://archetype-components.myshopify.com/password")
  await page.getByLabel("Enter store password").click()
  await page.getByLabel("Enter store password").fill("archetype")
  await page.getByLabel("Enter store password").press("Enter")
  await page.getByRole("link", { name: "block-variant-picker" }).click()
  let eventPromise = page.evaluate((eventName) => {
    return new Promise((resolve) => document.addEventListener(eventName, (event) => resolve(event)))
  }, EVENTS.variantChange)
  let radio = await page.getByRole("radio", { checked: false }).first()
  let text = await radio.getAttribute("value")
  let label = await page.getByText(text)
  // When
  await label.click()
  // Then
  expect(await eventPromise).toBeTruthy()
})
