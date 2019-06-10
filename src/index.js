'use strict';

const express = require('express');
const app = express();
const puppeteer = require('puppeteer');

const getBaseUrl = require('./helpers/getBaseUrl');
const findNavigation = require('./helpers/findNavigation');
const findPeople = require('./helpers/findPeople');
const findTitle = require('./helpers/findTitle');
const findLinks = require('./helpers/findLinks');

const crawlUrl = async (url = 'google.com') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://${url}`);

  const title = await findTitle(page);
  const navigation = await findNavigation(page, url);
  const people = await findPeople(page);
  const links = await findLinks(page);

  await browser.close();

  return {
    title,
    navigation,
    people,
    links,
  };
};

// url should be without www/https. Should probably accept both variants!
app.get('/:url(*)', async function(req, res) {
  try {
    const result = await crawlUrl(req.params.url);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// WIP
app.get('/debug/:url(*)', async function(req, res) {
  console.log('req', req.params.url);
  try {
    const result = await crawlUrl(req.params.url);
    res.send(`<code><pre>${JSON.stringify(result)}</pre></code>`);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT || 3000);
