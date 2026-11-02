import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.flipkart.com/');
  await page.getByRole('button', { name: '✕' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).click();
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill('iphones');
  await page.getByRole('textbox', { name: 'Search for Products, Brands' }).press('Enter');
  await page.waitForTimeout(3000);
  //await page.locator('//div[text()="Price -- Low to High"]').click();
  await page.locator('//div[@class="s6YJlm"]/div[3]').click();
  await page.waitForTimeout(3000);
  const prices_count=await page.locator('//div[@class="hZ3P6w DeU9vF"]').count();
  console.log(prices_count)
  const prices=await page.locator('//div[@class="hZ3P6w DeU9vF"]').allTextContents();
  console.log(prices)
  prices.forEach((price,index) =>{
        prices[index]=Number(price.replace('₹','').replaceAll(',',''));
  });
  console.log(prices);
  //const sortedPrices=prices.sort() - sorts as strings
  //to sort as numbers
  //creates a new array
  const sortedPrices=[...prices].sort((a, b) => a - b);
  
  console.log(sortedPrices);
  //expect(prices).toEqual(sortedPrices);
  /*
  This checks each adjacent pair and directly verifies ascending order, rather than creating a second sorted array. Both approaches are correct, 
  but this one demonstrates stronger testing logic.
  for(let i = 0; i < prices.length - 1; i++)
{
    expect(prices[i])
        .toBeLessThanOrEqual([prices[i + 1]);
}*/
  //expect(prices).toEqual(sortedPrices);
  //expect(prices).toBe(sortedPrices); 
  
  try {
    //toEqual() compares the contents of arrays
    expect(prices).toEqual(sortedPrices); 
    //This checks whether both variables refer to the exact same object in memory.
    //expect(prices).toBe(sortedPrices)
    console.log("Arrays are equal");
  }
  catch(error) {
    console.log("Arrays are NOT equal");
  }
    
});