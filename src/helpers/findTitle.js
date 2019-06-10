const findTitle = async page => {
  const title = await page.title();
  return title || 'Unknown domain';
};

module.exports = findTitle;
