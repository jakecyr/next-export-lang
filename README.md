# Next.js Export Lang

A simple npm package to add the HTML lang attribute to all Next.js export files after building to satisfy the Lighthouse accessibility rule for SEO.

## Installation and Usage

### Global CLI Usage

1. Run `npm install -g next-export-lang`
2. Example: run `next-export-lang en-US` when in a Next.JS project after running the `next export` command to add HTML 'lang' attributes to all HTML files in the 'out' folder.

### Local Project Installation

The next-export-lang package can be installed in a Node project so it can be integrated as part of your build process.

1. Run `npm install -D next-export-lang`
2. Add `next-export-lang` to your build command (after `next export`). For example, in your package.json, update your build script, adding `&& next-export-lang en` to the end, replacing 'en' with the language you want to add to your HTML files: `"build": "next export && next-export-lang"`.

A lang attribute with the defined language will be added to all HTML files in the 'out' folder generated from the `next export` command.
