import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import TerminalHeader from "../components/TerminalHeader";

export default function Root() {
  return (
    <>
      <div>
        <NavBar />
        {/* Uncomment below to use the terminal header */}
        {/* <TerminalHeader /> */}
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}
