import React, { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid"; // You might need to install this: npm install uuid
import Lottie from "lottie-react";
import "./NotificationSystem.css";

// Create context
const NotificationContext = createContext();

// Initial state
const initialState = {
  notifications: [],
};

// Reducer function
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        notifications: [...state.notifications, action.payload],
      };
    case "REMOVE_NOTIFICATION":
      return {
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.id
        ),
      };
    default:
      return state;
  }
};

// Provider component
export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = (content, animationData = null, duration = 3000) => {
    const id = uuidv4();
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id,
        content,
        animationData,
        duration,
      },
    });

    // Auto-remove notification after duration
    setTimeout(() => {
      dispatch({
        type: "REMOVE_NOTIFICATION",
        id,
      });
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ state, addNotification }}>
      {children}
      <NotificationContainer notifications={state.notifications} />
    </NotificationContext.Provider>
  );
};

// Custom hook to use notifications
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

// Notification container component
const NotificationContainer = ({ notifications }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div key={notification.id} className="notification-item">
          {notification.animationData && (
            <div className="notification-animation">
              <Lottie
                animationData={notification.animationData}
                loop={false}
                autoplay={true}
                style={{ height: 30, width: 30 }}
              />
            </div>
          )}
          <span className="notification-content">{notification.content}</span>
        </div>
      ))}
    </div>
  );
};
