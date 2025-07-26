import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/signin");
  };

  return (
    <main className="flex flex-col lg:flex-row items-center justify-between lg:px-20 gap-10">
      
      <div className="max-w-xl">
        <h2 className="text-6xl lg:text-7xl font-heading font-semibold leading-tight">
          Human <br />
          <span className="italic">&nbsp;stories & ideas</span>
        </h2>
        <p className="mt-6 text-lg text-gray-700 font-body">
          A place to read, write, and deepen your understanding
        </p>
        <button
          className="mt-6 bg-black text-white px-6 py-3 rounded-full text-lg font-semibold hover:opacity-90"
          onClick={handleSignin}
        >
          Start reading
        </button>
      </div>

      
      <div className="relative">
        <div className="w-100">
          <img
            src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
            alt="Writing Illustration"
            className="h-auto"
          />
        </div>
      </div>
    </main>
  );
}

export default Main;
