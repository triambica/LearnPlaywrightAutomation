import { test, expect } from '@playwright/test';


//Using basic xpath locators to locate the elements on the page and perform actions on them
test('Verify login with valid credentials for test automation practice page', async ({ page }) => {
    // Go to the login page
    await page.goto('https://practicetestautomation.com/practice-test-login/');
    //Using pressSequentially to fill the username letters one by one
    await page.locator('//input[@name="username"]').pressSequentially('student');
    //Using fill to fill the password field
    await page.locator('//input[@name="password"]').fill('Password123');
    await page.locator('//button[@id="submit"]').click();
    // Verify that the user is redirected to the secure area page
    //assertion to check the text "Logged In Successfully" is visible on the page
    await expect(page.locator('//h1[@class="post-title"]')).toBeVisible();

})

//Exhibiting strict mode violation error by using a locator with a non-unique selector
test('Verify strict mode violation error for understanding only', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill(process.env.APP_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.APP_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();  
    // Lets give a locator with a non-unique selector to see the strict mode violation error
   // await page.locator('class="oxd-text oxd-text--span oxd-main-menu-item--name"').click();
    await page.locator('//a[@href="/web/index.php/pim/viewPimModule"]').click();
})

//Using text locator to locate the elements on the page and perform actions on them
test('Verify forgot password link is clickable using text locator', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator("//p[text()='Forgot your password? ']").click() ;
})

//using partial text locator to locate the elements on the page and perform actions on them
test('Verify some long text is visible on the page using partial text locator', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');
    await page.locator('//p[contains(.,"Full-featured test runner with auto-waiting")]').isVisible();
})

//using the 'and', 'or' operators to locate the elements on the page and perform actions on them
test('Verify the submit button is clickable using and, or operators', async ({ page }) => {
    await page.goto('https://demoqa.com/text-box');
    await page.getByRole('textbox', { name: 'Full Name' }).fill("Mia");
    await page.getByRole('textbox', { name: 'name@example.com' }).fill("mia@example.com");
    await page.getByRole('textbox', { name: 'Current Address' }).pressSequentially("Hyderabad");
    await page.locator('#permanentAddress').fill("Hyderabad");
//Using and operator to locate the submit button
 // await page.locator('//button[@type="button" and @id="submit"]').click();
//Using and operator to locate the submit button
    await page.locator('//button[@type="dummy" or @id="submit"]').click();
})
    
//Traverse parent to child and locate element 
test('Verify the username field is accessible by traversing from assuming username field does not have unique locators', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.locator('//form[@class="oxd-form"]/div[1]/div/div[2]/input').fill("Admin");
})

//Traverse child to parent and locate element
//Example1
test('Verify the locator price of the phone by traversing from child to parent',async ({ page }) => {
    await page.goto('https://www.flipkart.com/search?q=iphone&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off');
    // Same locator can be used to find other phone price values with just change in text name, it will locate the specific phone price element. DOM structure is similar in this case for the phones, so it works.
    //phone names can be saved as test data in json file and accessed here instead of giving phone name
    await page.locator('//div[text()="Apple iPhone 17 (Black, 256 GB)"]/../../div[2]/div[1]').isVisible();

})

//Example 2
