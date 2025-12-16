import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Setting from "./Setting";
import BookingSlotList from "./BooingSlotList";
import CollaborateAdmin from "./CollaborateAdmin";
import GalleryAdmin from "./GalleryAdmin";
import BlogAdmin from "./BlogAdmin";

const AdminMain = () => {
  const [activeTab, setActiveTab] = useState({
    name: "Dashboard",
    value: 0,
    component: <Dashboard />,
  });
  const navigate = useNavigate();

  const [tabList, setTabList] = useState([
    {
      name: "Dashboard",
      value: 0,
      component: <Dashboard />,
    },

    {
      name: "Setting",
      value: 1,
      component: <Setting />,
    },

    {
      name: "Booking List",
      value: 2,
      component: <BookingSlotList />,
    },
    {
      name: "CollaborateAdmin",
      value: 3,
      component: <CollaborateAdmin />,
    },

    {
      name: "GalleryAdmin",
      value: 4,
      component: <GalleryAdmin />,
    },
    {
      name: "BlogAdmin",
      value: 5,
      component: <BlogAdmin />,
    },
  ]);

  return (
    <>
      <div className="admin-container">
        <div className="admin-header">
          <div className="header-right">
            <button
              className="btn btn-outline"
              onClick={() => {
                navigate("/");
              }}
            >
              ← Back
            </button>
          </div>
        </div>

        <div>
          {tabList.map((tab, index) => {
            return (
              <button
                onClick={() => {
                  setActiveTab(tab);
                }}
                key={index}
                style={{
                  background: activeTab.value == tab.value && "green",
                  border: "1px solid black",
                }}
              >
                {tab.name}
              </button>
            );
          })}
        </div>

        <div>{activeTab?.component && activeTab?.component}</div>
      </div>
    </>
  );
};

export default AdminMain;
