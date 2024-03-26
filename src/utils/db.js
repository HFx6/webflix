import Dexie from "dexie";

export const db = new Dexie("webflix");

db.version(1).stores({
	watchlist: "++id, [mediaId+userId], userId",
	liked: "++id, [mediaId+userId]",
	watched: "++id, [mediaId+userId]",
	users: "++id, &username",
	current_user: "++id, username, userId",
});

db.on("populate", () => {
	db.users.bulkPut([
		{ username: "Bouba", avatarUrl: "https://i.imgur.com/gBbRCL2.png" },
		{ username: "Kiki", avatarUrl: "https://i.imgur.com/Nj9cuxa.png" },
	]);
});

export async function getCurrentUser() {
	return await db.current_user.toArray();
}

export async function getUsers() {
	return await db.users.toArray();
}

export async function login(username) {
	const user = await db.users.where({ username }).first();
	if (!user) {
		throw new Error(`User with username ${username} not found.`);
	}
	await db.current_user.clear();
	await db.current_user.add({
		userId: user.id,
		username: user.username,
		avatarUrl: user.avatarUrl,
	});
}

export async function addUser(username) {
	await db.users.add({ username, avatarUrl: "https://i.imgur.com/LJ9dB0T.png" });
}

export async function logOutCurrentUser() {
	await db.current_user.clear();
}

export async function updateLikedMedia(mediaId) {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	const isIn = await db.liked
		.where("[mediaId+userId]")
		.equals([mediaId, userId])
		.first();
	if (isIn) {
		await db.liked
			.where("[mediaId+userId]")
			.equals([mediaId, userId])
			.delete();
		return false;
	} else {
		await db.liked.add({ mediaId, userId });
		return true;
	}
}

export async function updateWatchlistMedia(mediaId, mediaObject) {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	const isIn = await db.watchlist
		.where("[mediaId+userId]")
		.equals([mediaId, userId])
		.first();
	if (isIn) {
		await db.watchlist
			.where("[mediaId+userId]")
			.equals([mediaId, userId])
			.delete();
		return false;
	} else {
		await db.watchlist.add({ mediaId, userId, media: mediaObject });
		return true;
	}
}

export async function updateWatchedMedia(mediaId) {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	const isIn = await db.watched
		.where("[mediaId+userId]")
		.equals([mediaId, userId])
		.first();
	if (isIn) {
		await db.watched
			.where("[mediaId+userId]")
			.equals([mediaId, userId])
			.delete();
		return false;
	} else {
		await db.watched.add({ mediaId, userId });
		return true;
	}
}

export async function isMovieLiked(mediaId, username) {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	const isIn = await db.liked
		.where("[mediaId+userId]")
		.equals([mediaId, userId])
		.first();
	return isIn !== undefined;
}

export async function isMovieInWatchlist(mediaId, username) {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	const isIn = await db.watchlist
		.where("[mediaId+userId]")
		.equals([mediaId, userId])
		.first();
	return isIn !== undefined;
}

export async function isMovieWatched(mediaId, username) {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	const isIn = await db.watched
		.where("[mediaId+userId]")
		.equals([mediaId, userId])
		.first();
	return isIn !== undefined;
}

export async function getWatchlist() {
	const currentUser = await getCurrentUser();
	const userId = currentUser[0]?.userId;
	return await db.watchlist.where("userId").equals(userId).toArray();
}
