module.exports = async page => {
  const etfDescription = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll("#overview .fundcontent .content p"),
      element => element.innerText
    )
  );

  return etfDescription.join("\n");
};
