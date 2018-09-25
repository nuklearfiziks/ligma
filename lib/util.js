/**
 * @file
 * Various utility functions
 */

const stripTags = require('striptags');

const filters = [
	stripTags
];

module.exports = {
	cleanToot: toot => filters.reduce((acc, filter) => filter(acc), toot)
};
