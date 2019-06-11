'use strict';

const express = require('express');
var path = require('path');
const app = express();
const puppeteer = require('puppeteer');

const findNavigation = require('./helpers/findNavigation');
const findPeople = require('./helpers/findPeople');
const findTitle = require('./helpers/findTitle');
const findLinks = require('./helpers/findLinks');

const crawlUrl = async (url = 'https://google.com') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

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

// Debug screen WIP
app.get('/debug/:url(*)', async function(req, res) {
  console.log('debug');
  try {
    res.sendFile(path.join(__dirname + '/debug/index.html'));
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// url should be with www/https. Should probably accept both variants!
app.get('/crawl/:url(*)', async function(req, res) {
  try {
    const result = await crawlUrl(req.params.url);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(process.env.PORT || 3000);
