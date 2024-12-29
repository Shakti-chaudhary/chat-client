import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosApi } from "../utils/axios";
import { useAuthStore } from "./useAuthStore";
import { Message, User } from "../types/types";

type typeMessage = {
  message: string;
};

type typeUserId = string;

interface MassageState {
  messages: Message[];
  users: User[];
  selectedUser: User | null;
  isUsersLoading: boolean;
  isMessagesLoading: boolean;
  getUsers: () => void;
  getMessages: (userId: typeUserId) => Promise<void>;
  sendMessage: (message: typeMessage) => Promise<void>;
  subscribeToMessages: () => void;
  unsubscribeFromMessages: () => void;
  setSelectedUser: (user: User | null) => void;
}

export const useMessageStore = create<MassageState>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosApi.get<User[]>("/messages/users");
      set({ users: res.data });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error in fetching users..   ${error}`);
      }
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosApi.get<Message[]>(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error in fetching users..   ${error}`);
      }
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (message) => {
    const { selectedUser, messages } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosApi.post<Message>(
        `/messages/send/${selectedUser._id}`,
        message
      );

      set({ messages: [...messages, res.data] });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error sending message");
      }
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      const messages = get().messages;
      set({ messages: [...messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
}));
