import vegetableNames from '../testdata/greenKartVeggies.json';
import { test, expect } from '@playwright/test';

test('Verify adding vegetables to cart', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
  var totalOfPricesInArray=0;
  const veggiesPrice=[];
  for (const veggie of vegetableNames.veggies) {
    await page.locator(`//h4[text()="${veggie}"]/../div[3]/button`).click();
    let price=await page.locator(`//h4[text()="${veggie}"]//..//p`).textContent();
    //Using following-sibling axis to get the price of the veggie
    //let price=await page.locator(`//h4[text()="${veggie}"]/following-sibling::p[@class="product-price"]`).textContent();
    veggiesPrice.push(Number(price.replace('₹','')));
    
  }
  const totalprice=await page.locator(`//div[@class="cart-info"]//tbody//tr[2]//td[3]//strong`).textContent();
  console.log(veggiesPrice);
  //console.log(totalprice,typeof totalprice)
  totalOfPricesInArray = veggiesPrice.reduce((sum, itemprice) => sum + itemprice, 0);
  console.log(totalOfPricesInArray);
  try {
    expect(Number(totalprice)).toBe(totalOfPricesInArray); 
    console.log("Prices are equal");
  }
  catch(error) {
    console.log("Prices are NOT equal");
  }
})