import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function localStore<T>(key: string, value: T): Writable<T> {
  const data = typeof localStorage != 'undefined' ? localStorage.getItem(key) : null

  let storeInitialValue = value;
  if (data !== null) {
    try {
      storeInitialValue = JSON.parse(data);
    } catch (e) { 
      console.debug("Invalid APIConfiguration data: ", e)
      localStorage.setItem(key, JSON.stringify(value)); 
    }
  }
  console.debug('initialStoreValue: ', storeInitialValue);
  const store = writable<T>(storeInitialValue);
  store.subscribe(val => {
    if (typeof localStorage == 'undefined') {
      return
    }
    localStorage.setItem(key, JSON.stringify(val));
  })

  return store
}
