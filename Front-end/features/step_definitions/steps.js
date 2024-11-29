const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

let nameInput, emailInput, phoneInput, ratingRadio, bugsTextarea, experienceTextarea, submitButton;

Given('the user navigates to the game feedback form', async () => {
    console.log('naar browser');
  await browser.url('file:///' + __dirname + '/../../src/index.html'); // Update this with the correct path or URL
});

When('the user enters their name {string}', async (name) => {
  nameInput = await $('#name');
  await nameInput.setValue(name);
});

When('the user enters their email {string}', async (email) => {
  emailInput = await $('#email');
  await emailInput.setValue(email);
});

When('the user enters their phone number {string}', async (phone) => {
  phoneInput = await $('#phone');
  await phoneInput.setValue(phone);
});

When('the user rates the game {int} stars', async (rating) => {
  ratingRadio = await $(`#star${rating}`);
  await ratingRadio.click();
});

When('the user enters a bug report {string}', async (bugs) => {
  bugsTextarea = await $('#bugs');
  await bugsTextarea.setValue(bugs);
});

When('the user shares their experience {string}', async (experience) => {
  experienceTextarea = await $('#experience');
  await experienceTextarea.setValue(experience);
});

When('the user selects the genres {string} and {string}', async (genre1, genre2) => {
  const genreCheckbox1 = await $(`label:has(input[value="${genre1}"]) input`);
  const genreCheckbox2 = await $(`label:has(input[value="${genre2}"]) input`);
  await genreCheckbox1.click();
  await genreCheckbox2.click();
});

When('the user submits the form', async () => {
  submitButton = await $('button[type="submit"]');
  await submitButton.click();
});

Then('the form should be successfully submitted', async () => {
  // Assume that a success message appears after submission
  const successMessage = await $('#successMessage'); // Modify if necessary
  assert.ok(await successMessage.isDisplayed(), 'Success message is not displayed');
});

Then('a confirmation message should be displayed', async () => {
  // Check if a confirmation message appears after form submission
  const confirmationMessage = await $('#confirmationMessage'); // Modify if necessary
  assert.ok(await confirmationMessage.isDisplayed(), 'Confirmation message is not displayed');
});