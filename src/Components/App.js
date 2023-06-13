import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";

const App = () => {
  const apiBaseUrl = 'https://book-swap-api.dev.io-academy.uk/api'

  return (
    <div className="App bg-amber-100 h-screen">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage apiBaseUrl={apiBaseUrl}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
