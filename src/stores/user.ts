


import { writable } from 'svelte/store';
import { getUserSession } from "./../auth";
import { userService } from "./../api/api";


export const user = writable(null);
export const logoutUrl = writable("");
export const isSessionActive = writable(false);

export function getUser(){
    isSessionActive.set(false);
    return getUserSession()
    .then(session => {
      user.set(session);
      isSessionActive.set(true);
      return session;
    })
    .catch(() => {
      console.log("Login failed");
      return false;
    });
}

export function logout(){
    return userService.logout().then((resp)=>{
        user.set(null);
        return resp.data;
    })
}



const actions = {
  updateSessionStatus({ commit }: any, isActive: boolean) {
    commit("SET_SESSION_STATUS", isActive);
  }
};


