const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 dark:text-white">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4 ">
          <div className="relative ">
            <div
              className="size-72 rounded-2xl bg-primary/10 flex items-center
             justify-center  "
            >
              <img src="/g-chat.svg" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">Welcome to iMessage!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
          <span>{}</span>
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
