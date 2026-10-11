import { test, expect } from '@playwright/test';
import demoqaData from "../testdata/demoqa.json"

test('Verify working with text boxes', async ({ page }) => {
await page.goto('https://demoqa.com/text-box');
await page.getByRole('textbox', { name: 'Full Name' }).fill(demoqaData.fullname);
await page.getByRole('textbox', { name: 'name@example.com' }).fill(demoqaData.email);
await page.getByRole('textbox', { name: 'Current Address' }).pressSequentially(demoqaData.currentAddress);
await page.locator('#permanentAddress').fill(demoqaData.permanentAddress);
await page.getByRole('button', { name: 'Submit' }).click();

await expect(page.getByText('Name:' + demoqaData.fullname)).toBeVisible();
await expect(page.getByText('Email:' + demoqaData.email)).toBeVisible();
await expect(page.getByText('Current Address :' + demoqaData.currentAddress)).toBeVisible();
await expect(page.getByText('Permananet Address :' + demoqaData.permanentAddress)).toBeVisible();
})