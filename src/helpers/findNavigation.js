const getBaseUrl = require('./getBaseUrl');

/*
  findNavigation (WIP)
  Find internal navigation
  Criteria: 
  - Must be wrapped in <nav>
  - Must be a link to an internal page
*/
const findNavigation = async (page, url) => {
  const baseUrl = getBaseUrl(`https://${url}`);
  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('nav a')).map(elem => ({
      text: elem.innerText,
      url: elem.href,
    })),
  );
  return links.filter(a => a.url.includes(baseUrl));
};

module.exports = findNavigation;
