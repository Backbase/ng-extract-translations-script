const fs = require('fs');
const path = require('path');

function extractTranslationsFromDirectory(directoryPath, defaultLocale, otherLocales) {
    const files = fs.readdirSync(directoryPath);

    console.log('Items in directory:', files);

    let translatableMessages = [];

    files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // If it's a directory, recursively search for HTML files
            translatableMessages = translatableMessages.concat(extractTranslationsFromDirectory(filePath, defaultLocale, otherLocales));
        } else if (stats.isFile() && file.endsWith('.html')) {
            // If it's a file and ends with .html, extract translations
            translatableMessages = translatableMessages.concat(extractTranslationsFromHTML(filePath, defaultLocale, otherLocales));
        } else if (stats.isFile() && file.endsWith('.ts')) {
            // If it's a file and ends with .html, extract translations
            translatableMessages = translatableMessages.concat(extractTranslationsFromTypeScript(filePath, defaultLocale, otherLocales));
        }
    });

    return translatableMessages;
}

function extractTranslationsFromTypeScript(directoryPath, defaultLocale, otherLocales) {
    const fileContent = fs.readFileSync(directoryPath, 'utf8');
    const translatableMessages = [];

    // Regular expression to match $localize function calls
    const localizeRegex = /\$localize\s*`(?:\|)?:(?:\|)?([^@]+)@@([^:]+):([^`]+)`/g;

    let match;
    while ((match = localizeRegex.exec(fileContent)) !== null) {
        const [, defaultValue, key, context] = match;
        const sanitizedDefaultValue = defaultValue.replace(/^:\|/, '').replace('|', ' - '); // Remove leading ":|"
        const translation = { key, [defaultLocale]: context, context: sanitizedDefaultValue };
        otherLocales.forEach(locale => {
            translation[locale] = ''; // Initialize other locale values to empty string
        });
        translatableMessages.push(translation);
    }

    return translatableMessages;
}

function extractTranslationsFromHTML(directoryPath, defaultLocale, otherLocales) {
    const fileContent = fs.readFileSync(directoryPath, 'utf8');
    const translatableMessages = [];

    // Regular expression to match i18n attributes in Angular templates
    const i18nRegex = /i18n(-[\w-]+)?=["']([^"']*)\|([^@]+?)@@([^"']+)["']/g;
    let match;

    while ((match = i18nRegex.exec(fileContent)) !== null) {
        const [, , defaultValue, context, key] = match;
        const translation = { key, [defaultLocale]: defaultValue, context };
        otherLocales.forEach(locale => {
            translation[locale] = ''; // Initialize other locale values to empty string
        });
        translatableMessages.push(translation);
    }

    return translatableMessages;
}

module.exports = {
    extractTranslationsFromDirectory
}
