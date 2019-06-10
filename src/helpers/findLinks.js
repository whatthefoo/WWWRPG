const findLinks = async page => {
  const authors = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a')).map(elem => ({
      text: elem.innerText,
      url: elem.href,
    })),
  );
  return authors;
};

module.exports = findLinks;
