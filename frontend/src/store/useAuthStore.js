// here we can have bunch of different states and functions that we can use in our components
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


// create function takes a callaback function as the 1st argument where we would like to return an object. 
// This object will be our initial state.
export const useAuthStore = create((set) => ({ //useAuthStore: A hook that you can use in your components to access the store's state and methods.
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,


  isCheckingAuth: true, //loading state


  checkAuth: async() => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({authUser: res.data});
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({authUser: null});
    } finally {
      set({isCheckingAuth: false});
    }
  },


}));