export type UserId = string;

export type WishlistEntry = {
	item : WishlistItem;
	ordered: UserId;
	reserved: UserId;
	received: boolean;
	priority: number;
	user: UserId;
}

export type WishlistItem = {
	image: string;
	link: string;
	name: string;
	description: string;
}

export type UserPreferences = {
	displayName: string;
}
