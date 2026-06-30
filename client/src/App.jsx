
import Footer from "./Components/layout/footer";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./Components/layout/navbar";

function App() {
  return (
    <>
     <Navbar />
      <div className="container mt-3">
        <AppRoutes />
      </div>
      <Footer/>
    </>
  );
}

export default App;