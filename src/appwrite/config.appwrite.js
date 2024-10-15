import config from "../config/config";
import { Client, Databases, ID, Storage, Query } from "appwrite";

export class Service {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.endPoint(config.appwriteDatabaseID)
			.setProject(config.appwriteProjectID);

		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createPost(title, slug, content, blogImage, status, userID) {
		try {
			return await this.databases.createDocument(
				config.appwriteDatabaseID,
				config.appwriteCollectionID,
				slug,
				{ title, content, blogImage, status, userID }
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}

	async updatePost(slug, { title, content, blogImage, status }) {
		try {
			return await this.databases.updateDocument(
				config.appwriteDatabaseID, // databaseId
				config.appwriteCollectionID, // collectionId
				slug, // documentId
				{
					title,
					content,
					blogImage,
					status,
				} // data (optional)
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}

	async deletePost(slug) {
		try {
			return await this.databases.deleteDocument(
				config.appwriteDatabaseID, // databaseId
				config.appwriteCollectionID, // collectionId
				slug // documentId
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}

	async getPost(slug) {
		try {
			const result = await this.databases.getDocument(
				config.appwriteDatabaseID, // databaseId
				config.appwriteCollectionID, // collectionId
				slug, // documentId
				[Query.equal("status", "active")] // queries (optional)
			);

			if (!result.ok) {
				throw new Error("500 :: response in not right");
			}

			return result;
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}

	//file services

	async uploadFile(file) {
		try {
			return await this.storage.createFile(
				config.appwriteBucketID,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}

	async deleteFile(fileId) {
		try {
			return await this.storage.deleteFile(
				config.appwriteBucketID,
				fileId // fileId
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}

	async filePreview(fileId) {
		try {
			return await this.storage.getFilePreview(
				config.appwriteBucketID, // bucketId
				fileId // fileId
			);
		} catch (error) {
			console.log("Appwrite service :: create post :: error", error);
		}
	}
}

const service = new Service();
export default service;
