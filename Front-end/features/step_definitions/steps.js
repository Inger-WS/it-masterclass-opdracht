const { Given, When, Then } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require("chai");

let driver;

Given('the user is on the form page', async function()
{
    driver = new Builder().forBrowser('chrome').build();
    await driver.get('file:///' + __dirname + '/../../src/index.html');
});

When('the user enters a valid username and password', async function () 
{
    await driver.findElement(By.id('username')).sendKeys('valid_username');
    await driver.findElement(By.id('password')).sendKeys('valid_password');
});

When('submits the form', async function ()
{   
    await driver.findElement(By.css('button[type="submit"]')).click();    
});

Then('the user should see the submission result', async function ()
{
    const form = await driver.findElement(By.id('loginForm'));
    expect(form).to.not.be.null;
    await driver.quit();
});