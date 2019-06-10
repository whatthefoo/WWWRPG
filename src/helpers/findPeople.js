const findPeople = async page => {
  const authors = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("[rel=author], [itemprop='author']"),
    ).map(elem => elem.innerText),
  );
  return authors;
};

module.exports = findPeople;
