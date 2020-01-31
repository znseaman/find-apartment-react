const { DB_USER: user, DB_HOST: host, DB_NAME: database, DB_PASSWORD: password, DB_PORT: port } = process.env;

module.exports = {
	user,
	host,
	database,
	password,
	port,
};
