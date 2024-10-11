// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface UserProps {
	id: string;
	first_name: string;
	last_name: string;
	username: string;
	email: string;
}

type User = UserProps | null | undefined;

export {};
