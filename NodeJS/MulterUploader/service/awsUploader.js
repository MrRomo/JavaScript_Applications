const stream = require('stream');
const s3 = require('../config/s3.config.js');
const uuid = require('uuid/v4')
const path = require('path')

exports.doUpload = (req, res, data) => {
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
					if (i == req.files.length-1) {
						console.log('UPLOADED:', uploaded);
						resolve({error,uploaded});
					}
				})
			}
		} else {
			resolve({ error: 'Not files uploaded' })
		}
	})
}