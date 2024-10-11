import { user } from '../stores';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	console.log('[DEBUG] +page.ts load()');
	console.log('[DEBUG] User: ', user);
};
