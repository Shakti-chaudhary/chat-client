import { create } from "zustand";
import { axiosApi } from "../utils/axios";
import toast from "react-hot-toast";
import { Socket } from "socket.io-client";
import { initializeSocket } from "../utils/socketConfig";
import { User } from "../types/types";

type loginType = {
  email: string;
  password: string;
};

type signupType = {
  fullName: string;
  email: string;
  password: string;
};
type updateProfileType = {
  profilePic: string;
};

export interface AuthState {
  validUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  onlineUsers: string[];
  lastSeenUsers: Record<string, string>;
  socket: Socket | null;
  checkAuth: () => void;
  login: (data: loginType) => void;
  logout: () => void;
  signup: (data: signupType) => void;
  updateProfile: (data: updateProfileType) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  validUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: false,
  onlineUsers: [],
  lastSeenUsers: {},
  socket: null,
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosApi.get<User>("/auth/check");
      set({ validUser: res.data });
      get().connectSocket();
    } catch (error) {
      set({ isCheckingAuth: false });

      if (error instanceof Error) {
        // toast.error("User invalid..");
      }
      set({ validUser: null });
    }
  },
  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosApi.post<User>("/auth/login", data);

      set({ validUser: res.data });
      toast.success("Loggin Successfull");
      get().connectSocket();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error in login...");
      }
    } finally {
      set({ isLoggingIn: false });
    }
  },
  logout: async () => {
    try {
      await axiosApi.post("/auth/logout");
      set({ validUser: null });
      toast.success("Logout successfull..");
      get().disconnectSocket();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error in logout...");
      }
    }
  },
  signup: async (data) => {
    const res = await axiosApi.post<User>("/auth/signup", data);
    set({ validUser: res.data });
    toast.success("Signup successfull...");
    get().connectSocket();
  },
  updateProfile: async (data) => {
    const userData = {
      profilePic: data.profilePic,
      userId: get().validUser?._id || "",
    };
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosApi.put("/auth/update-profile-image", userData);
      set({ validUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error instanceof Error) {
        toast.error("error in updating profile image. appStore ");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { validUser } = get();
    if (!validUser?._id) return;

    const socket = initializeSocket(validUser._id);

    socket.on("getOnlineUsers", (userIds: string[]) => {
      set({ onlineUsers: userIds });
    });

    socket.on("getLastSeen", (userIds: Record<string, string>) => {
      set({ lastSeenUsers: userIds });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
    }
    set({ socket: null });
  },
}));
