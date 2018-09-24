/**
 * @file
 * Load configuration from env vars or config file
 */

const {
	USER_LIST_ID,
	ACCESS_TOKEN,
	API_URL,
	CORPUS_LOCATION
} = process.env;

const config = {
	userListId: USER_LIST_ID,
	accessToken: ACCESS_TOKEN,
	apiUrl: API_URL,
	location: CORPUS_LOCATION || __dirname
};

module.exports = config;
