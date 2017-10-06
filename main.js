'use strict';
const puppeteer = require('./node_modules/puppeteer');
const devices = require('./node_modules/puppeteer/DeviceDescriptors');
const test = require('./node_modules/tape');

(async function() {
    const browser = await puppeteer.launch({headless: false});
    let page = await browser.newPage();
    await page.goto('https://www.missguided.co.uk/unicorn-class-premier-delivery', {waitUntil: 'networkidle'});

     test('There is a buy now button', async function(t) {
      const button = await page.mainFrame().$('#addToBasketButton');
      t.ok(button);
      t.end();
    });

     test('The button starts out disabled', async function(t) {
      const disabledButton = await page.mainFrame().$('#addToBasketButton:disabled');
      t.ok(disabledButton);
      t.end();
    });

     test('The button is enabled when you agree to terms', async function(t) {
      await page.click('[for="unicorn-terms__checkbox"]');
      const enabledButton = await page.mainFrame().$('#addToBasketButton:enabled');
      t.ok(enabledButton);
      t.end();
    })


    test('we\'ve navigated to the homepge', async function(t) {
        await page.goto('https://www.missguided.co.uk/');
        const cmshome = await page.mainFrame().$('.cms-home');
        t.ok(cmshome);
        t.end();
    });

    test.onFinish(() => {
      browser.close();
    })

})();