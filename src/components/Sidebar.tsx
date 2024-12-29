import { useEffect, useState } from "react";
import { useMessageStore } from "../app/useChatStore";
import { useAuthStore } from "../app/useAuthStore";
import SidebarSkeleton from "./SidebarSkel";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useMessageStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-[15%] bg-blue-400 sm:w-[35%] lg:w-[22%] dark:text-white border-r border-base-300 flex flex-col transition-all duration-400 rounded-lg mr-4">
      <div className="border-b border-base-300 w-full p-3 ">
        <div className="flex items-center gap-2 justify-center sm:justify-start">
          <Users className="size-6" />
          <span className="font-medium hidden sm:block">Contacts</span>
        </div>

        <div className="mt-4 block">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium sm:block hidden">
              Show Online ({onlineUsers.length - 1})
            </span>
          </label>
        </div>
      </div>

      <div className="overflow-hidden px-3 dark:text-gray-600 ">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full  p-1 sm:p-3 flex items-center gap-3
              rounded-xl transition-all duration-200
              hover:bg-base-200 hover:scale-[0.98] bg-slate-100 my-2
              ${
                selectedUser?._id === user._id
                  ? "bg-base-200 ring-2 ring-primary/20"
                  : ""
              }
            `}
          >
            <div className=" relative">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="sm:size-12  object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-1 right-1 size-3 bg-green-500 
                  rounded-full ring-2 ring-gray-500"
                />
              )}
            </div>

            <div className="hidden sm:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center  py-4 text-slate-200">
            No users to message register your friends...
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
