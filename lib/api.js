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

const getUserToots = (userId, since) => new Promise((resolve, reject) => {
	api.get(`accounts/${userId}/statuses?${since ? `&since_id=${since}` : ''}`, async (err, data, res) => {
		if (err) {
			console.log(err);
			return reject(err);
		}

		const {headers} = res;
		const sinceId = headers && headers.link ? getNextPage(headers.link) : false;

		if (sinceId) {
			resolve([...data, ...await getUserToots(userId, sinceId)]);
		}

		return resolve(data);
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
