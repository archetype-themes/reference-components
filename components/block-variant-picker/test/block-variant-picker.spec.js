import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("https://archetype-components.myshopify.com/password")
  await page.getByLabel("Enter store password").click()
  await page.getByLabel("Enter store password").fill("archetype")
  await page.getByLabel("Enter store password").press("Enter")
  await page.getByRole("link", { name: "block-variant-picker" }).click()
  expect(page.getByLabel("154cm")).toBeChecked()
  expect(page.getByLabel("Nested")).toBeChecked()
  expect(page.getByLabel("Carbon-fiber")).toBeChecked()
  await page.getByText("158cm").click()
  await expect(page).toHaveURL(/variant=48019024871728/)
})
