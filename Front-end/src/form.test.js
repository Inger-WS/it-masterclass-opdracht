// index.test.js
const { TextEncoder, TextDecoder } = require('util');

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe('Game Feedback Formulier', () => {
    let document;

    beforeAll(() => {
        // Load the HTML file
        const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');
        document = new JSDOM(html).window.document;
    });

    test('should have a form with required fields', () => {
        const form = document.getElementById('feedbackForm');
        expect(form).toBeTruthy();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        
        expect(nameInput.required).toBe(true);
        expect(emailInput.required).toBe(true);
        expect(phoneInput.required).toBe(true);
    });

    test('should have a rating section', () => {
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        expect(ratingInputs.length).toBe(5); // Check if there are 5 rating options
    });

    test('should have optional fields for bugs and experience', () => {
        const bugsTextarea = document.getElementById('bugs');
        const experienceTextarea = document.getElementById('experience');
        
        expect(bugsTextarea).toBeTruthy();
        expect(experienceTextarea).toBeTruthy();
    });

    test('should have checkboxes for genres', () => {
        const checkboxes = document.querySelectorAll('input[name="genres"]');
        expect(checkboxes.length).toBe(5); // Check if there are 5 genre options
    });

    test('should have a submit button', () => {
        const button = document.querySelector('button[type="submit"]');
        expect(button).toBeTruthy();
        expect(button.textContent).toBe('Verzenden');
    });
});