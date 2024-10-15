import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	Client = new Client();
	account;

	constructor() {
		this.Client.setEndpoint(config.appwriteUrl).setProject(
			config.appwriteProjectID
		);

		this.account = new Account(this.Client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);

			if (!userAccount) {
				return userAccount;
			} else {
				return this.Client.login({ email, password });
			}
		} catch (error) {
			console.log(
				"Appwrite service :: failed to create account :: error",
				error
			);
		}
	}

	async login({ email, password }) {
		try {
			return await Account.createEmailPasswordSession(email, password);
		} catch (error) {
			console.log("Appwrite service ::can't login:: error", error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite serive :: getCurrentUser :: error", error);
		}

		return null;
	}

	async logout() {
		try {
			await this.account.deleteSessios();
		} catch (error) {
			console.log("Appwrite service :: Logout :: error", error);
		}
	}
}

const authService = new AuthService();

export default authService;
