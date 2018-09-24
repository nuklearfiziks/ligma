/**
 * @file
 * Various utility functions
 */

const stripTags = require('striptags');

const filters = [
	stripTags
];

const getNextPage = link => {
	if (!link) {
		return false;
	}
	const match = link.match(/<.+since_id=(.+)>; rel="prev"/);

	if (match && match.length > 1) {
		return match[1];
	}

	return false;
};

module.exports = {
	getNextPage,
	cleanToot: toot => filters.reduce((acc, filter) => filter(acc), toot)
};
