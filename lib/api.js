/**
 * @file
 * Promisifed API
 */

const Masto = require('mastodon-api');
const pThrottle = require('p-throttle');
const parseLinkHeader = require('parse-link-header');
const {userListId, apiUrl, accessToken} = require('./config');

const api = new Masto({
	access_token: accessToken,
	api_url: apiUrl
});

const get = (resource, opts) => new Promise((resolve, reject) => {
	api.get(resource, opts, (err, data, res) => {
		if (err) {
			reject(err);
		}
		resolve({data, res});
	});
});

let i = 0;
const getUserToots = pThrottle(async (userId, max) => {
	try {
		const opts = max ? {
			limit: 10,
			since_id: max
		} : {limit: 10};
		const {data, res} = await get(`accounts/${userId}/statuses`, opts);

		console.log(i++);
		const {headers: {link}} = res;
		console.log(link);

		if (link) {
			const {next, prev} = parseLinkHeader(link);

			if (next) {
				console.log(next, prev);
				return [
					...data,
					// ...await getUserToots(userId, next.max_id)
					...await getUserToots(userId, prev.since_id)
				];
			}
		}

		return data;
	} catch (error) {
		console.error(error);
	}
}, 1, 5000);

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
