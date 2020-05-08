const fetch = require('isomorphic-fetch');
const fs = require('fs');
const Dropbox = require('dropbox').Dropbox;

const storedb = (__dirname + '/../../data/store.json');

const dbx = new Dropbox({
	accessToken: process.env.DROPBOX_TOKEN,
	fetch: fetch
});

exports.uploadStore = function() {
	fs.readFile(storedb, (err, data) => {
		if (err)
			console.log('Error while reading \'store.json\' from disk!');
		
		dbx
			.filesUpload({
				path: '/store.json',
				contents: data,
				mode: 'overwrite'
			})
			.then(res => {
				console.log('\'store.json\' uploaded to Dropbox [' + new Date() + ']');	
			})
			.catch(err => {
				console.log('Error while uploading \'store.json\' to Dropbox!');
			});
	});
}

exports.downloadStore = function() {
	dbx
		.filesDownload({ path: '/store.json' })
		.then(res => {
			console.log('\'store.json\' downloaded from Dropbox [' + new Date() + ']');

			fs.writeFile(storedb, res.fileBinary, 'binary', err => {
				if (err)
					console.log('Error while writing \'store.json\' to disk!');
			});
		})
		.catch(err => {
			console.log('Error while downloading \'store.json\' from Dropbox!');
		});
}
