import { dev } from '$app/environment'

export const finalUrl = (url) => {
    return dev ? url : `/Biblioteca${url}` 
  }