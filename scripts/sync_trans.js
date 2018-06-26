#!/usr/bin/env node

/**
 * SyncTrans
 *
 * Will sync all the translation files from the source (English).
 *
 * In simple words, when source language has new strings/ids to be translated, it will add those to translation files
 * so they don't become outdated.
 *
 * When the source translation contains:
 *
 * en.json
 * ```json
 * {
 *     "HELLO": "Hello my friend!",
 *     "TUTORIAL": "Tutorial",
 *     "BLOG": "My GoNevis Blog"
 * }
 * ```
 *
 * While target translation contains:
 *
 * fa.json
 * ```json
 * {
 *     "HELLO": "سلام دوست من!",
 *     "TUTORIAL": "آموزش"
 * }
 * ```
 *
 * It wil turn the `fa.json` translation file into:
 *
 * fa.json
 * ```json
 * {
 *     "HELLO": "سلام دوست من!",
 *     "TUTORIAL": "آموزش",
 *     "BLOG": "My GoNevis Blog"
 * }
 * ```
 */
const fs = require('fs');
const SOURCE_LOCALE = 'en';
const targetlocales = ['fa'];

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
