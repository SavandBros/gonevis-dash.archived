#!/usr/bin/env node

/**
 * SyncTrans
 *
 * Will sync all the translation files from the source (English).
 */
const fs = require('fs');
const SOURCE_LOCALE = 'en';
const targetlocales = ['en'];

fs.readFile(`src/public/languages/${SOURCE_LOCALE}.json`, 'utf8', function (err, data) {
  if (err) {
    throw err;
  }

  const sourceTrans = JSON.parse(data);

  targetlocales.forEach(function (targetLocale) {
    let targetTransFileName = `src/public/languages/${targetLocale}.json`;

    fs.readFile(targetTransFileName, 'utf8', function (err, data) {
      if (err) {
        throw err;
      }

      let targetTrans = JSON.parse(data);
      for (let key in sourceTrans) {
        if (!sourceTrans.hasOwnProperty(key)) {
          continue;
        }

        if (!targetTrans.hasOwnProperty(key)) {
          targetTrans[key] = sourceTrans[key]
        }
      }

      fs.writeFile(targetTransFileName, JSON.stringify(targetTrans, null, 2) + '\n', function (err) {
        if (err) {
          throw err
        }

        console.log(`Synced Locale ${targetLocale}!`);
      })
    })
  })
});
