import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function localStore<T>(key: string, value: T): Writable<T> {
  const data = typeof localStorage != 'undefined' ? localStorage.getItem(key) : null
  const store = writable<T>(value);
  if (data !== null) {
    try {
      store.set(JSON.parse(data) as T);
    } catch (e) { 
      console.log("Invalid APIConfiguration data: ", e)
      localStorage.setItem(key, JSON.stringify(value)); 
    }
  }
  store.subscribe(val => {
    if (typeof localStorage == 'undefined') {
      return
    }
    localStorage.setItem(key, JSON.stringify(val));
  })

  return store
}
