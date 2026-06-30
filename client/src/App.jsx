import Footer from "./Components/Layout/Footer";
import Navbar from "./Components/layout/navbar";
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