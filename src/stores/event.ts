import { writable } from 'svelte/store';
import { getEndPoint } from "../api/api";

export const eventsStore = writable([]);
export const activeEventStore = writable({ id: 622583 });
export const activeIntersectionStore = writable({});


export function retrieveEvent(eventId: string | number) {
    getEndPoint(`event/${eventId}`)
      .then(result => {
        activeEventStore.set(result);
      })
      .catch(errMessage => {
        const err = {
          id: -1,
          error: true,
          message: errMessage
        };
        activeEventStore.set(err);
      });
}

export function retrieveEventIntersection(intersectionId: number) {
    return getEndPoint(`intersection/${intersectionId}`)
      .then(result => {
        activeIntersectionStore.set(result);
        return result;
      })
      .catch(errMessage => {
        const err = {
          error: true,
          message: errMessage
        };
        activeIntersectionStore.set(err);
        return err;
      });
}

