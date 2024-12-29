import { useEffect, useRef, useState } from "react";
import { useMessageStore } from "../app/useChatStore";
import { Send, LucideX } from "lucide-react";
import { useAuthStore } from "../app/useAuthStore";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useMessageStore();
  const { validUser, onlineUsers } = useAuthStore();

  const { sendMessage, setSelectedUser } = useMessageStore();
  const [text, setText] = useState("");

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      subscribeToMessages();
    }

    return () => unsubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({ message: text });
      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  if (isMessagesLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center p-4 border-b">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="ml-3 h-4 w-24 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
                <div className="ml-3 h-4 w-48 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col h-full w-full ">
      {/* headerContainer  */}
      <div className="flex items-center p-4  bg-slate-200 rounded-lg w-full">
        <div className="header-user w-full flex items-center">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
          <div className="user-info ml-3">
            <span className=" font-medium">
              {selectedUser?.fullName || "No Name"}
            </span>
            <div className="text-sm block sm:hidden text-zinc-400">
              {onlineUsers.includes(selectedUser?._id as string)
                ? "Online"
                : "Offline"}
            </div>
          </div>
        </div>
        <div className=" ">
          <button onClick={() => setSelectedUser(null)}>
            <LucideX />
          </button>
        </div>
      </div>
      {/* chatContainer */}
      <div className="flex-1 overflow-y-auto p-4  no-scrollbar space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.senderId === validUser?._id
                ? "justify-end "
                : "justify-start"
            } `}
            ref={messageEndRef}
          >
            <div className="flex max-w-[80%]">
              <div
                className={`flex items-center justify-center ${
                  message.senderId === validUser?._id
                    ? "flex-row-reverse "
                    : "flex-row"
                }`}
              >
                <img
                  src={
                    message.senderId === validUser?._id
                      ? validUser.profilePic !== ""
                        ? validUser.profilePic
                        : "/avatar.png"
                      : selectedUser?.profilePic !== ""
                      ? selectedUser?.profilePic
                      : "/avatar.png"
                  }
                  alt="profile"
                  className="w-8 h-8 rounded-full border"
                />
                <div className="messageTime-box flex flex-col mx-2">
                  <div
                    className={` ${
                      message.senderId === validUser?._id
                        ? "bg-blue-500 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl text-right"
                        : "bg-gray-200 text-gray-600 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl"
                    } p-3`}
                  >
                    {message.text && <p>{message.text} </p>}
                  </div>
                  <div className="time-wrapper">
                    <time
                      className={` ${
                        message.senderId === validUser?._id
                          ? "text-xs opacity-50 mt-1 block text-right"
                          : "text-xs opacity-50 mt-1 block "
                      }`}
                    >
                      {formatMessageTime(message.createdAt)}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* inputContainer */}
      <div className="h-[8%] bg-slate-200 rounded-lg flex justify-center">
        <div
          className="flex w-full
       "
        >
          <form
            onSubmit={handleSendMessage}
            className="flex items-center   w-full "
          >
            <div className="flex-1  flex mx-2 rounded-lg bg-white dark:bg-gray-800 ">
              <input
                type="text"
                className="  input input-bordered w-full rounded-lg input-sm sm:input-md p-2  dark:bg-gray-800 dark:text-gray-300 outline-none"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <button
                type="submit"
                className="btn btn-sm btn-circle bg-blue-500 text-white p-2 m-1 rounded-full cursor-pointer"
                disabled={!text.trim()}
              >
                <Send size={22} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
