import { writable } from "svelte/store";

export let sidebarVisible = writable(false);

export const toasts = writable([]);

export function toast(message, type = 'info') {
  const id = Math.random().toString(36);
  toasts.update(all => [...all, { id, message, type }]);
  setTimeout(() => {
    toasts.update(all => all.filter(t => t.id !== id));
  }, 3000);
}
