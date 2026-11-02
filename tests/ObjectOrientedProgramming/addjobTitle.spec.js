const jobTitles = {
    title1: "SDET1",
    title2: "Account Executive",
    title3: "COO"
}

//Using for-in to display each job title
/*
for (let title in jobTitles){
    console.log("loop starts")
    console.log(jobTitles[title])

}
*/
import { test, expect } from '@playwright/test';

import data from "../../testdata/login.json"

for (let title in jobTitles) {

    test(`Verify Admin can add job title - ${title}`, async ({ page }) => {
        console.log('Step 1: Navigate to the OrangeHRM login page');
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        console.log('Step 3: Enter the username');
        await page.getByRole('textbox', { name: 'Username' }).fill(data.username);

        console.log('Step 5: Enter the password');
        await page.getByRole('textbox', { name: 'Password' }).fill(data.password);

        console.log('Step 6: Click Login');
        await page.getByRole('button', { name: 'Login' }).click();

        console.log('Step 7: Verify the dashboard is visible');
        await expect(page.getByText('Time at Work')).toBeVisible();
        console.log('Step 8: Open the Admin section');
        await page.getByRole('link', { name: 'Admin' }).click();
        console.log('Step 9: Open the Job menu');
        await page.getByText('Job').click();
        console.log('Step 10: Open Job Titles');
        await page.getByRole('menuitem', { name: 'Job Titles' }).click();
        console.log('Step 11: Click Add');
        await page.getByRole('button', { name: ' Add' }).click();
        console.log('Step 12: Click the job title field');
        await page.getByRole('textbox').nth(1).click();
        console.log('Step 13: Enter the job title');

        // const data1 = new Date()

        //const randomString = Math.random().toString(36).substring(2, 7); // this willm generate random5chars 

        // await page.getByRole('textbox').nth(1).fill("testjobtitle"+randomString);
        // await page.getByRole('textbox').nth(1).fill(faker.person.jobTitle());
        await page.getByRole('textbox').nth(1).fill(jobTitles[title]);
        await page.waitForTimeout(4000) // this will halt the executio for 4 sec 
        console.log('Step 14: Click the description field');
        await page.getByRole('textbox', { name: 'Type description here' }).click();
        console.log('Step 15: Enter the job description');
        await page.getByRole('textbox', { name: 'Type description here' }).fill('Automation testing');
        console.log('Step 16: Click the notes field');
        await page.getByRole('textbox', { name: 'Add note' }).click();
        console.log('Step 17: Enter the notes');
        await page.getByRole('textbox', { name: 'Add note' }).fill('Automation notes');
        console.log('Step 18: Save the new job title');
        await page.getByRole('button', { name: 'Save' }).click();
        console.log('Step 19: Verify the Job Titles page is visible');
        await expect(page.getByRole('heading', { name: 'Job Titles' })).toBeVisible();
     
    });

}