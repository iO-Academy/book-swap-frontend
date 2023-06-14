import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import BookPage from "./BookPage";
import BooksPage from "./BooksPage";

const App = () => {
  const apiBaseUrl = 'https://book-swap-api.dev.io-academy.uk/api'

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BooksPage apiBaseUrl={apiBaseUrl} claimed={0}/>}/>
          <Route path="/claimed" element={<BooksPage apiBaseUrl={apiBaseUrl} claimed={1}/>}/>
          <Route path="/books/:id" element={<BookPage apiBaseUrl={apiBaseUrl}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
