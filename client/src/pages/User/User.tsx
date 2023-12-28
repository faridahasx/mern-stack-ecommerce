import { useState } from "react";
import ProfileNav from "../../components/user/ProfileNav";
import AddressBook from "../../components/user/AddressBook";
import Layout from "../../components/Layout";
import "./styles.css";

const User = () => {
  const [currentWindow, setCurrentWindow] = useState("Address Book");

  return (
    <Layout>
      <main id="profile" className="flex">
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
      </main>
    </Layout>
  );
};

export default User;
