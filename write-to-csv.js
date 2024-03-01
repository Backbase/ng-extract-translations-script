const createCsvWriter = require('csv-writer').createObjectCsvWriter;

function writeToCSV(translations, outputPath, defaultLocale, otherLocales) {
    const csvWriter = createCsvWriter({
        path: outputPath,
        header: [
            { id: 'key', title: 'key' },
            { id: defaultLocale, title: defaultLocale },
            ...otherLocales.map(locale => ({ id: locale, title: locale })),
            { id: 'context', title: 'context' }
        ]
    });

    csvWriter.writeRecords(translations)
        .then(() => console.log('CSV file written successfully'))
        .catch(error => console.error('Error writing CSV file:', error));
}

module.exports = {
    writeToCSV
};
