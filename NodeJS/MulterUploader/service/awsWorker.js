const stream = require('stream');
const s3 = require('../config/s3.config.js');
const uuid = require('uuid/v4')
const path = require('path')
const awsService = {}


awsService.upload = (req, res, data) => {
	return new Promise((resolve, reject) => {
		const s3Client = s3.s3Client;
		let params = s3.uploadParams;

		const uploaded = []
		const error = []
		if (req.files) {
			for (let i = 0; i < req.files.length; i++) {
				const file = req.files[i];
				params.Key = data.Key + uuid() + path.extname(file.originalname).toLowerCase();
				uploaded.push(params.Key)
				params.Body = file.buffer;
				const uploadPormise = s3Client.upload(params, (err, data) => {
					console.log(params);
					if (err) {
						console.log('ERROR: ', error);
						error.push({ error: err })
						reject(error);
					}
					if (i == req.files.length - 1) {
						console.log('UPLOADED:', uploaded);
						resolve({ error, uploaded });
					}
				})
			}
		} else {
			resolve({ error: 'Not files uploaded' })
		}
	})
}
awsService.delete = (req, res, Key) => {
	return new Promise((resolve, reject) => {
		const s3Client = s3.s3Client;
		const params = {
			Bucket: s3.uploadParams.Bucket,
			Key: Key
		}

		const deletePormise = s3Client.deleteObject(params, (err, data) => {
			console.log(data);
			if (err) {
				console.log(err, err.stack); // an error occurred
				reject(error);
			}
			else {
				console.log('deleted');
				resolve({ message: `file ${params.Key} deleted` });
			}
		})
	})
}
module.exports = awsService