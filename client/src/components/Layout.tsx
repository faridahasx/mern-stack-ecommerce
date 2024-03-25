import { ReactNode } from "react";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import "./Layout.css";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      <main className="layout-main flex">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
