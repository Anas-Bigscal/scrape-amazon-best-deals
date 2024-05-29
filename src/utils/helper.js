exports.nextPage = async (nextPageLinkSelector, page) => {
  const nextPageLink = await page.$(nextPageLinkSelector);
  await nextPageLink.click();
  await page.waitForNavigation();
  if (!nextPageLink) {
    console.log("All pages are extracted");
    lastPageReached = true;
    return page;
  }
  return page;
};
