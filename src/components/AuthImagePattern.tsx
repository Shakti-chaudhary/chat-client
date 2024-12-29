type titleText = { path: "login" | "signup"; title: string; subtitle: string };
const AuthImagePattern = ({ path, title, subtitle }: titleText) => {
  return (
    <div className="hidden sm:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className=" mb-16">
          {path === "login" ? (
            <img src="/login.svg" alt="" />
          ) : (
            <img src="/signup.svg" alt="" />
          )}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
