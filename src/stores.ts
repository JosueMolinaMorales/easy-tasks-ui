import { persisted } from 'svelte-persisted-store';

export interface User {
	email: string;
	username: string;
	firstname: string;
	lastname: string;
}

export interface Task {
	id: string;
	author: string;
	title: string;
	description: string;
	due_date: number;
	priority: string;
	status: string;
	created_at: number;
	updated_at: number;
}

export const user = persisted<User>('user', {} as User);
export const token = persisted<string>('token', '');
export const gravatarUrl = persisted<string>('gravatarUrl', '');
