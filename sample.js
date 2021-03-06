/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

const hapi = require('hapi');
const server = new hapi.Server();

// Load the SDK
var AWS = require('aws-sdk');

// Create an S3 client
var s3 = new AWS.S3();

// Create a bucket
var bucketName = 'rene-ccc504'

server.connection({
	host: 'localhost',
	port: '3000'
});

server.route({
	path: "/{keyName}",
	method: "POST",
	handler(req, reply) {
		s3.createBucket({ Bucket: bucketName }, function () {
			const { keyName } = req.params;
			var params = { Bucket: bucketName, Key: keyName, Body: 'Hello World!' };
			s3.putObject(params, function (err, data) {
				if (err)
					console.log(err)
				else
					reply("Successfully uploaded data to " + bucketName + "/" + keyName);
			});
		});
	}
});

server.start(err => {
	if (err) {
		throw err;
	}
	console.log(`Server Running at PORT ${server.info.port}`);
});
