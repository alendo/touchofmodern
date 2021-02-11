// this is the Base Page


import { getMaxListeners } from "process";
import { By, until, WebDriver,}   from "selenium-webdriver";


export class RegisPage {
        driver: WebDriver;
        url: string ="https://www.touchofmodern.com/"
        splashLogo: By = By.className("logo_splash");
        loginButton: By = By.className("grey_linkk");
        emailField: By = By.id("email");
        continueButton: By = By.id("continue_button");
        passworldField: By = By.xpath("//input[@id='user_session_password']");
        loginSubmit: By = By.id("login_submit");

    
        constructor(driver: WebDriver) {
            this.driver = driver;
        }
 
  // This method is to navigate to website wwww.touchofmodern.com
  async navigateToSite() {
      await this.driver.get(this.url);
      await this.driver.wait(until.elementLocated(this.splashLogo));
      await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.splashLogo))
      );
  }
  // This method is to login to the website
  async completeLogin(email: string, password: string) {
    await this.driver.wait(until.elementLocated(this.loginButton));
    await (await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.loginButton)))).click();
    await (await this.driver.wait(until.elementLocated(this.emailField))).sendKeys(`${email}\n`);
    await (await this.driver.wait(until.elementLocated(this.passworldField))).sendKeys(`${password}\n`);
  }
}