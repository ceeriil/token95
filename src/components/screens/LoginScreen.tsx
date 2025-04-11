export const LoginScreen = () => {
  return (
    <div className="h-screen w-full bg-[#0B0100] flex items-center  text-white text-2xl flex-col login-bg">
      <h1 className="silver-title ">arcanium</h1>
      <div className="login-box mt-24 p-2 min-w-[20rem] rounded-xl text-black">
        <div className="border-2 border-black h-full rounded-xl p-4 py-6">
          <h2 className="font-[900] text-5xl uppercase">
            Enter <br /> Password
          </h2>
          <input type="text" className="text-white py-3 px-2 mt-12" />
        </div>
      </div>
    </div>
  );
};
