const apiUrl = "/api/users";
export const UserService = {
	getAll: async () => {
		return await fetch(apiUrl).then(res => res.json());
	},
	add: async (username, password) => {
		return await fetch(`${apiUrl}/add`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json());
	},
	search: async search => {
		return await fetch(`${apiUrl}/search`, {
			method: "POST",
			body: JSON.stringify({ search }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json());
	},
	login: async (username, password) => {
		return await fetch(`${apiUrl}/login`, {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(res => res.json());
	}
};
