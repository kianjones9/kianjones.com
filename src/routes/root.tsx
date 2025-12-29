import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
// import TerminalHeader from "../components/TerminalHeader";
import Footer from "../components/Footer";

export default function Root() {
  return (
    <>
      <NavBar />
      {/* Uncomment below to use the terminal header */}
      {/* <TerminalHeader /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
