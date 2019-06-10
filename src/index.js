'use strict';

const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

const crawlUrl = async (url = 'google.com') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://${url}`);
  const title = await page.title();
  innerText = await page.evaluate(() => {
    return JSON.parse(document.querySelector('body').innerText);
  });
  await browser.close();
  return {
    title,
    innerText,
  };
};

// url should be without www/https. Should probably accept both variants!
app.get('/:url?', async function(req, res) {
  console.log('req', req.params.url);
  try {
    const result = await crawlUrl(req.params.url);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/debug/:url?', async function(req, res) {
  console.log('req', req.params.url);
  try {
    const result = await crawlUrl(req.params.url);
    res.send(`<code><pre>${JSON.stringify(result)}</pre></code>`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT || 3000);
