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
	const [, next] = link.match(/<.+max_id=(.+?)>; rel="next"/);
	const [, prev] = link.match(/<.+since_id=(.+?)>; rel="prev"/);

	return [next, prev];
};

module.exports = {
	getNextPage,
	cleanToot: toot => filters.reduce((acc, filter) => filter(acc), toot)
};
