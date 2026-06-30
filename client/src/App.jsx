import Footer from "./Components/layout/Footer";
import Navbar from "./Components/layout/Navbar";
import AppRoutes from "./Routes/AppRoutes";


function App() {
  return (
    <>
     <Navbar/>
      <div className="container mt-3">
        <AppRoutes />
      </div>
      <Footer/>
    </>
  );
}

export default App;