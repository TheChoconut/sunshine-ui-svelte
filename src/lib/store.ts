import { localStore } from '$lib/localStore'
import { writable } from 'svelte/store';

export const theme = localStore('theme', 'dark');
export const pinDialog = writable({open: false, pin: ''})