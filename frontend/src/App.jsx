import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import ListingDetails from "./pages/ListingDetails";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
