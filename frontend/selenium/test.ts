import * as Selenium from 'selenium-webdriver';
import * as Chrome from 'selenium-webdriver/chrome'
import * as Chromedriver from 'chromedriver'
import * as assert from 'assert'

const defaultCommandTimeout = 20000;

(async () => {
    const options = new Chrome.Options().addArguments("--headless", "--no-sandbox", "--disable-dev-shm-usage","--disable-gpu");
    let service:Chrome.ServiceBuilder = new Chrome.ServiceBuilder(Chromedriver.path)
    let driver:Selenium.WebDriver = new Selenium.Builder().forBrowser('chrome').setChromeOptions(options).setChromeService(service).build();
    const session = await driver.getSession()
    //Signup
    await driver.get('http://localhost:5173/signup')
    await driver.findElement(Selenium.By.id('surname')).sendKeys('Max');
    await driver.findElement(Selenium.By.id('last_name')).sendKeys('Mustermann');
    await driver.findElement(Selenium.By.id('occupation')).sendKeys('Teacher');
    await driver.findElement(Selenium.By.id('age')).sendKeys('37');
    await driver.findElement(Selenium.By.id('email')).sendKeys('max.mustermann@gmail.com');
    await driver.findElement(Selenium.By.id('password')).sendKeys('1234abcd');
    await driver.findElement(Selenium.By.xpath('//button[normalize-space()="Submit"]')).click();
    await driver.wait(Selenium.until.urlContains('/profile'), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('surname')).getText().then((text)=>{
        assert.equal(text,'Max');
    });
    await driver.findElement(Selenium.By.id('last_name')).getText().then((text)=>{
        assert.equal(text,'Mustermann');
    });
    await driver.findElement(Selenium.By.id('occupation')).getText().then((text)=>{
        assert.equal(text,'Teacher');
    });
    await driver.findElement(Selenium.By.id('age')).getText().then((text)=>{
        assert.equal(text,'37');
    });
    await driver.findElement(Selenium.By.id('email')).getText().then((text)=>{
        assert.equal(text,'max.mustermann@gmail.com');
    });
    //Signout
    await driver.wait(Selenium.until.elementLocated(Selenium.By.id('signout')), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('signout')).click();
    await driver.wait(Selenium.until.urlContains('/signin'), defaultCommandTimeout);
    //Signin
    await driver.findElement(Selenium.By.id('email')).sendKeys('max.mustermann@gmail.com');
    await driver.findElement(Selenium.By.id('password')).sendKeys('1234abcd');
    await driver.findElement(Selenium.By.xpath('//button[normalize-space()="Submit"]')).click();
    await driver.wait(Selenium.until.urlContains('/profile'), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('surname')).getText().then((text)=>{
        assert.equal(text,'Max');
    });
    await driver.findElement(Selenium.By.id('last_name')).getText().then((text)=>{
        assert.equal(text,'Mustermann');
    });
    await driver.findElement(Selenium.By.id('occupation')).getText().then((text)=>{
        assert.equal(text,'Teacher');
    });
    await driver.findElement(Selenium.By.id('age')).getText().then((text)=>{
        assert.equal(text,'37');
    });
    await driver.findElement(Selenium.By.id('email')).getText().then((text)=>{
        assert.equal(text,'max.mustermann@gmail.com');
    });
    //Profile Update
    await driver.wait(Selenium.until.elementLocated(Selenium.By.id('edit')), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('edit')).click();
    await driver.findElement(Selenium.By.id('surname')).sendKeys('Jeff');
    await driver.findElement(Selenium.By.id('last_name')).sendKeys('Jefferson');
    await driver.findElement(Selenium.By.id('occupation')).sendKeys('Janitor');
    await driver.findElement(Selenium.By.id('age')).sendKeys('53');
    await driver.findElement(Selenium.By.id('email')).sendKeys('jeff.jefferson@web.de')
    await driver.wait(Selenium.until.elementLocated(Selenium.By.id('update')), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('update')).click();;
    await driver.findElement(Selenium.By.id('surname')).getText().then((text)=>{
        assert.equal(text,'Jeff');
    });
    await driver.findElement(Selenium.By.id('last_name')).getText().then((text)=>{
        assert.equal(text,'Jefferson');
    });
    await driver.findElement(Selenium.By.id('occupation')).getText().then((text)=>{
        assert.equal(text,'Janitor');
    });
    await driver.findElement(Selenium.By.id('age')).getText().then((text)=>{
        assert.equal(text,'53');
    });
    await driver.findElement(Selenium.By.id('email')).getText().then((text)=>{
        assert.equal(text,'jeff.jefferson@web.de');
    });
    //Delete Profile
    await driver.wait(Selenium.until.elementLocated(Selenium.By.id('delete')), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('delete')).click();
    await driver.wait(Selenium.until.urlContains('/signin'), defaultCommandTimeout);
    await driver.findElement(Selenium.By.id('email')).sendKeys('jeff.jefferson@web.de');
    await driver.findElement(Selenium.By.id('password')).sendKeys('1234abcd');
    await driver.findElement(Selenium.By.xpath('//button[normalize-space()="Submit"]')).click();
    await driver.wait(Selenium.until.urlContains('/signin'), defaultCommandTimeout);
    //Test suite finished
    console.log("Session-" + session.getId() + " Test suite successful finished!")
    await driver.quit();
})()
