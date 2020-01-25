const uuid = require("uuid/v4");
const hash = require("./hash");

class Session {
	constructor(email) {
		this.email = email;
		this.id = uuid();
	}

	toString() {
		return Session.dataToString(this.email, this.id);
	}

	static userData(email, id) {
		return `${email}|${id}`;
	}

	static dataToString(email, id) {
		const user_data = Session.userData(email, id);
		return `${user_data}|${hash(user_data)}`;
	}

	static parse(session_str = "||") {
		const [email, id, session_hash] = session_str.split(`|`);
		return { email, id, session_hash };
	}

	static verify(session_str) {
		const { email, id, session_hash } = Session.parse(session_str);
		const user_data = Session.userData(email, id);

		return hash(user_data) === session_hash;
	}
}

module.exports = Session;
