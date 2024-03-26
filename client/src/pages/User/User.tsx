import "./User.css";
import { useState } from "react";
import ProfileNav from "../../components/User/ProfileNav";
import AddressBook from "../../components/User/AddressBook";
import Layout from "../../components/Layout";

const User = () => {
  const [currentWindow, setCurrentWindow] = useState("Address Book");

  return (
    <Layout>
      <section id="profile" className="flex">
        <ProfileNav
          setCurrentWindow={setCurrentWindow}
          currentWindow={currentWindow}
        />
        <section id="profile-window" className="flex column">
          {currentWindow === "" || currentWindow === "Address Book" ? (
            <AddressBook />
          ) : (
            <h1 id="profile-window-empty" className="center">
              You don't have any orders yet
            </h1>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default User;
