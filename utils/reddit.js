const axios = require('axios');

// Predefined list of subreddits.
const _SUB = [
	'memes',
	'dankmemes',
	'meme',
	'dank_meme',
	'MemeEconomy',
	'me_irl'
];

exports.getRandomPost = async function() {
	let i = Math.floor(Math.random() * _SUB.length);
	const res = await axios.get('https://www.reddit.com/r/' + _SUB[i] + '.json?limit=100');

	const posts = res.data.data.children;
	let idx = Math.floor(Math.random() * 101);

	return posts[idx].data;
}
