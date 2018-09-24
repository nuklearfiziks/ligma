/**
 * @file
 * Generates a text corpus from multiple users
 */

const {writeFileSync} = require('fs');
const api = require('./api');
const {location} = require('./config');
const {cleanToot} = require('./util');

(async () => {
	try {
		const userIds = (await api.getUserList()).map(({id}) => id);
		const allToots = await userIds.reduce(async (acc, id) => {
			try {
				return [...await acc, ...await api.getUserToots(id)];
			} catch (error) {
				console.log(error);
			}
		}, Promise.resolve([]));

		const cleaned = allToots
			.map(({content}) => content)
			.map(cleanToot);

		writeFileSync(location, JSON.stringify(cleaned), 'utf-8');
		console.log(`Corpus saved to ${location}`);
	} catch (error) {
		console.log(error);
	}
})();
