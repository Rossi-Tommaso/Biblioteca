import { writable } from "svelte/store";
import { db } from "../lib/firebase.config";

export let books = writable([]);