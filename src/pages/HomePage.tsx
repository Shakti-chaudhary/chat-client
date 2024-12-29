import { useMessageStore } from "../app/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChat";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useMessageStore();

  return (
    <div className=" dark:bg-gray-300 rounded-lg mt-3  mb-4 ">
      <div className="flex items-center justify-center p-2 sm:p-4  overflow-auto">
        <div className="bg-base-100 rounded-lg shadow-cl  w-full h-[calc(100vh-6rem)] sm:h-[calc(100vh-8rem)]">
          <div className="flex h-full  overflow-hidden ">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
