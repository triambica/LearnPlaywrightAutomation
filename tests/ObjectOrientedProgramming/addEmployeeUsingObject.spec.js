import { test, expect } from '@playwright/test';

import logindata from "../../testdata/login.json"

import { faker } from '@faker-js/faker';


const employees = {
    emp1: { firstName: "Ria", lastName: "Sharma" },
    emp2: { firstName: "Cal", lastName: "N" },
    emp3: { firstName: "Elina", lastName: "A" },
}

for (let emp in employees) {

    test(`Verify Admin can employee - ${emp}`, async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await page.getByRole('textbox', { name: 'Username' }).fill(logindata.username);
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill(logindata.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByRole('link', { name: 'PIM' }).click();
        await page.getByRole('link', { name: 'Add Employee' }).click();
        await page.getByRole('textbox', { name: 'First Name' }).click();
        await page.getByRole('textbox', { name: 'First Name' }).fill(employees[emp].firstName);
        await page.getByRole('textbox', { name: 'Last Name' }).click();
        await page.getByRole('textbox', { name: 'Last Name' }).fill(employees[emp].lastName);
        await page.getByRole('textbox').nth(4).click();
        // await page.getByRole('textbox').nth(4).fill('0388ty');  
        await page.getByRole('button', { name: 'Save' }).click();
        //await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPersonalDetails/empNumber/189');
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();  // 5sec 

        // await page.close()
    });
}