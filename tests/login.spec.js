import { test, expect } from '@playwright/test';

import logindata from "../testdata/login.json"

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
 //await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').fill(process.env.SAUCE_USERNAME);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(process.env.SAUCE_ACCESS_KEY);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible({timeout:20000});
});

test('Verify the user is unable to login when the account is locked', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
});

test('Verify the login for problematic user account', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('problem_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await expect(page.locator('[data-test="item-0-img-link"]')).toBeVisible();
  await page.locator('[data-test="inventory-container"]').click();
  await expect(page.locator('[data-test="item-3-img-link"]')).toBeVisible();
});

test('Verify that user is unable to login when the user account does not exist in the system', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('performance_glitch_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('ecret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('path').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('Verify that user is able to login with error_user credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('error_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  await expect(page.locator('[data-test="secondary-header"]')).toBeVisible();
});

test('Verify the login with visual_user credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('visual_user');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
});

test('Verify that error is displayed with fields blank', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('path').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^Epic sadface: Username is required$/ })).toBeVisible();
});

test('Verify that error is displayed when password field is left blank', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('svg').first()).toBeVisible();
  await expect(page.locator('path').nth(1)).toBeVisible();
  await page.locator('div').filter({ hasText: /^Epic sadface: Password is required$/ }).click();
});

