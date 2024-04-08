import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("https://archetype-components.myshopify.com/password")
  await page.getByLabel("Enter store password").click()
  await page.getByLabel("Enter store password").fill("archetype")
  await page.getByLabel("Enter store password").press("Enter")
  await page.getByRole("link", { name: "block-price" }).click()
  await expect(page.locator("block-price")).toContainText("$885.95")
})
