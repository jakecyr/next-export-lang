#! /usr/bin/env node

const cheerio = require('cheerio');
const fs = require('fs/promises');
const path = require('path');
const glob = require('glob');
const minify = require('html-minifier').minify;

const args = process.argv.slice(2);
const lang = args.length > 0 ? args[0] : 'en';

(async () => {
  const outFolder = path.resolve('./out');
  const outFolderExists = await pathExists(outFolder);

  if (!outFolderExists) {
    console.error(`'out' folder does not exist yet. Run 'next export' first.`);
    process.exit(1);
  }

  const htmlFiles = await findFiles(outFolder + '/**/*.html');
  console.log(`Found ${htmlFiles.length} HTML files in the 'out' folder.`);
  console.log(`Adding lang="${lang}" to all files...`);

  await Promise.all(
    htmlFiles.map(async (filePath) => {
      const rawHTML = (await fs.readFile(filePath)).toString();
      const $ = cheerio.load(rawHTML);

      $('html').attr('lang', lang);

      const outputHTML = $.html();
      const minifiedHTML = minify(outputHTML);

      console.log(`Adding 'lang' attribute to html element in file: ${filePath}...`);
      await fs.writeFile(filePath, minifiedHTML);
    }),
  );

  console.log('Added lang attributes to all files.');
})();

async function pathExists(pathToCheck) {
  try {
    await fs.stat(pathToCheck);
    return true;
  } catch {
    return false;
  }
}

function findFiles(searchPattern) {
  return new Promise((resolve, reject) => {
    glob(searchPattern, (err, matches) => {
      if (err) {
        return reject(err);
      }
      resolve(matches);
    });
  });
}
