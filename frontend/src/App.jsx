import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import ListingDetails from "./pages/ListingDetails";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import HostDashboard from "./pages/HostDashboard";
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<ProtectedRoute>
            <p>Profile Page - Only visible to authenticated users</p>
          </ProtectedRoute>}></Route>
          <Route path="/my-bookings" element={<ProtectedRoute><MyBookings/></ProtectedRoute>} />
          <Route path="/host-dashboard" element={<ProtectedRoute><HostDashboard/></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
