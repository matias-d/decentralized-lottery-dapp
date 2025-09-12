import { Route, Routes } from "react-router";

// Layouts
import DashboardLayout from "./layouts/dashboard-layout";
import LotteryProvider from "./context/lottery-provider";

// Pages
import Lottery from "./pages/dashboard/lottery";
import Tickets from "./pages/dashboard/tickets";
import Tokens from "./pages/dashboard/tokens";
import Home from "./pages/dashboard/home";
import Auth from "./pages/auth";

function App() {
  return (
    <>
      <LotteryProvider>
        <Routes>
          <Route path="/" element={<Auth />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Home />} />

            <Route path="tokens" element={<Tokens />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="lottery" element={<Lottery />} />
          </Route>
        </Routes>
      </LotteryProvider>
    </>
  );
}

export default App;
