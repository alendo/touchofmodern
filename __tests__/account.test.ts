
import { RegisPage } from "./pageObjects/basePage";
const chromedriver = require("chromedriver");
import { WebDriver, until, Builder, Capabilities, By } from "selenium-webdriver";
import { Driver } from "selenium-webdriver/chrome";

const driver: WebDriver = new Builder ()
    .withCapabilities(Capabilities.chrome())
    .build();

const acctPage = new RegisPage(driver);


describe("Test Account Pages", () => {
   jest.setTimeout(15000);
    beforeEach(async () => {
    await acctPage.navigateToSite();
     });
    
     // This tests login in and going to My Account
    test("Go to account page", async () => {
        await acctPage.completeLogin("albertqa@gmail.com", "testing123");
        await driver.wait(until.urlIs("https://www.touchofmodern.com/sales"));


        await (await driver.findElement(By.className("account-nav nav-icon hidden-xs"))).click();

        // Looks for My Account button and selects it
        await driver.wait(until.elementsLocated(By.className("account-dropdown-menu dropdown-menu")));
        const accountButton = await driver.findElement(By.xpath("//body/header/div[@class='header-content fixed-content']/nav[@aria-label='Main']/div[@id='main-nav']/div[@class='row']/div[@id='account-dropdown-menu']/ul[@class='account-dropdown-menu dropdown-menu']/li[1]/a[1]"));
        await accountButton.click();

        await driver.sleep(3000);
        await driver.wait(until.urlIs("https://www.touchofmodern.com/account"), 5000);

        // Finds the title of page and gets text
        const pageTitle = await (await driver.findElement(By.className("page-title"))).getText();

        // Tests to see if the title page text matches
        expect(pageTitle).toEqual("MY ACCOUNT");
            }, 20000);
        });

    // This tests users ability to view Favorites
    test("View Favorites", async () => {
        const faveSection = await driver.findElement(By.xpath("//body/main[contains(@role,'main')]/div[@id='overall_content']/div[@id='primary_content']/div/div/nav[contains(@aria-label,'Account')]/ul/li[2]/a[1]"));
        await faveSection.click();
    
        await driver.sleep(5000);
        const pageTitle = await (await driver.findElement(By.className("title"))).getText();
            
        // Tests to see if page title matches
         expect(pageTitle).toEqual("MY FAVORITES");
        }, 20000);

    // Tests if user can see Product Details Page
    test("View Product Details", async () => {
        const productFave = await driver.findElement(By.xpath("//a[@title='Go Tough']//div[2]//div[1]"));
        await productFave.click();
    
        await driver.sleep(5000);
        const pageTitle = await (await driver.findElement(By.xpath("//h3[normalize-space()='Go Tough']"))).getText();
        
        // Tests to see if page title matches
        expect(pageTitle).toEqual("GO TOUGH");
        }, 20000);

    // Tests if product can be added to cart and product is displayed in cart
    test("Add Favorited Product to Cart", async () => {
        const addtocartButton = await driver.findElement(By.className("btn add-to-cart-btn btn-primary"));
        await addtocartButton.click();
    
        await driver.sleep(2000);
        const cartIcon = await driver.wait(until.elementLocated(By.className("icon-tomo icon-cart")), 5000);
        await cartIcon.click();

        await driver.sleep(3000);
        const pageTitle = await (await driver.findElement(By.xpath("//h1[@class='page-title']"))).getText();
        
        // Tests to see if page is shopping cart
        expect(pageTitle).toEqual("SHOPPING CART");
        }, 20000);

        // Closes browser after all functions are run
        afterAll(async () => {
        await driver.quit();
    });

