import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import BookPage from "./BookPage";

const App = () => {
  const apiBaseUrl = 'https://book-swap-api.dev.io-academy.uk/api'

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage apiBaseUrl={apiBaseUrl}/>}/>
          <Route path="/books/:id" element={<BookPage apiBaseUrl={apiBaseUrl}/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
