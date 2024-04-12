import { test } from "@playwright/test"

test("test", async ({ page }) => {
  await page.goto("/")
  await page.getByRole("link", { name: "block-buy-buttons" }).click()
  await page.getByRole("button", { name: "Add to cart" }).click()
})
