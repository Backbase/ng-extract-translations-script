const path = require('path');
const { extractTranslationsFromDirectory } = require("./extract-translations");
const { getArguments } = require("./utils.js");
const { writeToCSV } = require('./write-to-csv.js')

const args = getArguments();

console.log('Script arguments', args);

let directory = args['-d'];
const defaultLocale = args['-l'] || 'en-US';
const otherLocales = args['-o'] || [];
const csvpath = args['-c'];
directory = directory === '.' ? __dirname : path.resolve(directory);

console.log('Directory:', directory);
console.log('Default Locale:', defaultLocale);
console.log('Other Locales:', otherLocales);
console.log('CSV Path:', csvpath);

console.log('Seeking for translations');

const translations = extractTranslationsFromDirectory(directory, defaultLocale, otherLocales);

if (translations.length === 0) {
    console.warn(`There are no translations found in ${directory} so no CSV file will be created`);
} else {
    console.log(`Writing CSV file with translations in ${csvpath}`);
    writeToCSV(translations, csvpath, defaultLocale, otherLocales);
    console.log(`CSV file has been created in ${csvpath}`);
}
