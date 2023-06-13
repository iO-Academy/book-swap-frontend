import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";

const App = () => {
  return (
    <div className="App bg-amber-100 h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
