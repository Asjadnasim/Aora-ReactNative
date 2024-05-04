import {
	Account,
	Avatars,
	Client,
	Databases,
	ID,
	Query,
} from 'react-native-appwrite';

export const config = {
	endpoint: 'https://cloud.appwrite.io/v1',
	platform: 'com.asjad.aora',
	projectId: '6633bf810011f623edca',
	databaseId: '6633c1a9002bf07fc49e',
	userCollectionId: '6633c602002f3e916e7c',
	videoCollectionId: '6633c62a001818cfe989',
	storageId: '6633c847001ded512718',
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

// Init your react-native SDK
const client = new Client();

client
	.setEndpoint(endpoint)
	.setProject(projectId) // Your project ID
	.setPlatform(platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;

		const avatarUrl = avatars.getInitials(username);

		await signIn(email, password);

		const newUser = await databases.createDocument(
			databaseId,
			userCollectionId,
			ID.unique(),
			{
				accountId: newAccount.$id,
				email,
				username,
				avatar: avatarUrl,
			}
		);

		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export const signIn = async (email, password) => {
	try {
		const session = await account.createEmailSession(email, password);

		return session;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export async function getAccount() {
	try {
		const currentAccount = await account.get();

		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}

export async function getCurrentUser() {
	try {
		const currentAccount = await getAccount();
		if (!currentAccount) throw Error;

		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
			[Query.equal('accountId', currentAccount.$id)]
		);

		if (!currentUser) throw Error;

		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
		return null;
	}
}

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId);

		return posts.documents;
	} catch (error) {
		console.log(error);
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.orderDesc('$createdAt', Query.limit(7)),
		]);

		return posts.documents;
	} catch (error) {
		console.log(error);
	}
};

export const searchPosts = async (query) => {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.search('title', query),
		]);

		return posts.documents;
	} catch (error) {
		console.log(error);
	}
};

export async function getUserPosts(userId) {
	try {
		const posts = await databases.listDocuments(databaseId, videoCollectionId, [
			Query.equal('creator', userId),
		]);

		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
}

export const signOut = async () => {
	try {
		const session = await account.deleteSession('current');

		return session;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};
