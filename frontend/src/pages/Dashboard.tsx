import Header from "../components/dashboard/Header";
import Main from "../components/dashboard/Main";
import Footer from "../components/dashboard/Footer";

function Dashboard() {
  return (
    <div className="min-h-screen bg-[#f9f5f1] text-black flex flex-col justify-between font-body">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Dashboard;
