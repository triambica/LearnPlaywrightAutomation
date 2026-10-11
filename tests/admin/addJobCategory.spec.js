import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Verify add job category functionality', async ({ page }) => {

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.APP_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.APP_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByRole('link', { name: 'Admin' }).click(timeout = 20000);
    await page.getByText('Job', { exact: true }).click();
    await page.getByRole('menuitem', { name: 'Job Categories' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    await page.getByRole('textbox').nth(1).fill(faker.person.jobTitle());
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByRole('heading', { name: 'Job Categories' })).toBeVisible()

})