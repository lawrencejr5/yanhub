import React, { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import { useGlobalContext } from "../Context";

import Nav from "../components/Nav";
import LeaderboardNav from "../components/LeaderboardNav";
import Bell from "../components/Bell";
import Greet from "../components/Greet";
import SingleShow from "../components/SingleShow";
import CreateShowForm from "../components/modals/CreateShowForm";
import Loading from "../components/Loading";
import Notification from "../components/Notification";
import Empty from "../components/Empty";
import ShowsOptions from "../components/options/ShowsOptions";

const Videos = () => {
  useEffect(() => {
    document.title = "Yanhub - Shows";
    getShows();
  }, []);

  const {
    endpoint,
    token,
    loading,
    setLoading,
    notification,
    openCreateVideoModal,
    setOpenCreateVideoModal,
  } = useGlobalContext();

  const [shows, setShows] = useState([]);

  const getShows = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${endpoint}/shows`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShows(data.shows);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loading />;
  return (
    <main className="videos-main grid-body">
      <Nav />
      <section className="body">
        <Notification notification={notification} />
        <Greet />
        <div className="createVideoBtn">
          <button onClick={() => setOpenCreateVideoModal(true)}>
            New show &nbsp;
            <FaPlusCircle />
          </button>
        </div>
        <div className="videos">
          <div className="header">
            <h2>Shows</h2>
          </div>
          {!shows.length ? (
            <Empty />
          ) : (
            <div className="videos-container">
              {shows.map((shws, index) => {
                return <SingleShow key={index} shws={shws} />;
              })}
            </div>
          )}
        </div>
      </section>
      <LeaderboardNav />
      <CreateShowForm open={openCreateVideoModal} getShows={getShows} />
      <ShowsOptions />
      <Bell />
    </main>
  );
};

export default Videos;
