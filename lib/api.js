/**
 * @file
 * Promisifed API
 */

const Masto = require('mastodon-api');
const {userListId, apiUrl, accessToken} = require('./config');
const {getNextPage} = require('./util');

const api = new Masto({
	access_token: accessToken,
	api_url: apiUrl
});
let i = 0;
const getUserToots = (userId, max, since) => new Promise((resolve, reject) => {
	api.get(`accounts/${userId}/statuses?${since ? `since_id=${since}` : ''}&${max ? `max_id=${max}` : ''}`, async (err, data, res) => {
		if (err) {
			console.log(err);
			return reject(err);
		}
		console.log(i++);

		const {headers} = res;

		if (headers && headers.link) {
			resolve([...data, ...await getUserToots(userId, ...getNextPage(headers.link))]);
		}
	});
});

module.exports = {
	getUserList: (listId = userListId) => new Promise((resolve, reject) => {
		api.get(`lists/${listId}/accounts?limit=0`, (err, data) => {
			if (err) {
				reject(err);
			}
			resolve(data);
		});
	}),
	getUserToots
};
