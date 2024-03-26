import "./Layout.css";
import { ReactNode } from "react";
import Navigation from "./navigation/Navigation";
import Footer from "./footer/Footer";

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
