const apiUrl = "/api/messages";
export const MessageService = {
	get: async (from, to, url = apiUrl) => {
		return await fetch(url, {
			method: "POST",
			body: JSON.stringify({ from, to }),
			headers: {
				"Content-Type": "application/json"
			}
		});
	},
	getAll: async from => {
		return await MessageService.get(from, "all", `${apiUrl}/get/all`);
	},
	add: async (body, from, to) => {
		return await fetch(`${apiUrl}/add`, {
			method: "POST",
			body: JSON.stringify({ body, from, to }),
			headers: {
				"Content-Type": "application/json"
			}
		});
	}
};
