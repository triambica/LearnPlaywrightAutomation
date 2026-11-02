const invalidData = {
    dataset1: { username: "unknown", password: "unknown" },
    dataset2: { username: "abcd", password: "123" },
    datset3: { username: "xcv", password: "uuui" }
}


import { test, expect } from '@playwright/test';

//import logindata from "../../testdata/login.json"

for (let data in invalidData)
{

    test(`Verify login with invalid credentials - ${data}`, async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByRole('textbox', { name: 'Username' }).click();
        //await page.getByRole('textbox', { name: 'Username' }).fill(logindata.wrongusername);
        await page.getByRole('textbox', { name: 'Username' }).fill(invalidData[data].username);
        await page.getByRole('textbox', { name: 'Password' }).click();
        //await page.getByRole('textbox', { name: 'Password' }).fill(logindata.wrongpassword);
        await page.getByRole('textbox', { name: 'Password' }).fill(invalidData[data].password);

        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Invalid credentials')).toBeVisible();
    });
}