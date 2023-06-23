import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import BookPage from "./BookPage";
import BooksPage from "./BooksPage";
import AddBookPage from "./AddBookPage";

const App = () => {
  // change the below constant if you're running your own api
  const apiBaseUrl = 'https://book-swap-api.dev.io-academy.uk/api'

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<BooksPage apiBaseUrl={apiBaseUrl} claimed={0}/>}/>
          <Route path="/claimed" element={<BooksPage apiBaseUrl={apiBaseUrl} claimed={1}/>}/>
          <Route path="/books/:id" element={<BookPage apiBaseUrl={apiBaseUrl}/>}/>
          <Route path="/books/add" element={<AddBookPage apiBaseUrl={apiBaseUrl}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
