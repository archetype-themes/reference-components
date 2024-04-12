import { test, expect } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "block-price" }).click()
  await expect(page.locator("block-price")).toContainText("$885.95")
})
