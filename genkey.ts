var fs = require("fs");
var keypair = require("keypair");

var pair = keypair({
	bits: 2048, // size for the private key in bits. Default: 2048
	e: 65537, // public exponent to use. Default: 65537
});

fs.writeFile(__dirname + "/private.key", pair.private, (err) => {
	if (err) {
		return console.error(err);
	}
	console.log("RSA private key file generated");
});

fs.writeFile(__dirname + "/public.pem", pair.public, (err) => {
	if (err) {
		return console.error(err);
	}
	console.log("RSA public key file generated");
});
