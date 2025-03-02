import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Logging in with:", { username, password, rememberMe });
    // Add authentication logic here
  };

  return (
    <div className="flex h-screen">
      {/* Left Panel */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-10">
        <h2 className="text-xl">Hi there,</h2>
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <img src="Avatar.jpg" alt="Avatar" className="w-32 h-32 mt-6" />
        <div className="mt-auto">
          <img src="logo.jpg" alt="intX Logo" className="w-40" />
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col justify-center items-center p-10">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Log in to your account</h2>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span className="ml-2">Remember me</span>
            </label>
            <a href="#" className="text-blue-500">Forgot Password?</a>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Log In</button>
          <p className="mt-4 text-center">
            New member? <a href="register.html" className="text-blue-500">Create an account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;