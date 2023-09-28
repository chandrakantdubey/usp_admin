import { useDispatch, useSelector } from "react-redux";
import { ToastNotification } from "@carbon/react";
import { useState } from "react";

const Notifications = () => {
  const notificattions = useSelector(
    (state) => state.notifications.notifications
  );
  const [currentCount, setCurrentCount] = useState(0);
  const dispatch = useDispatch();
  return (
    <div className="toast-notifications">
      {notificattions.map((notification, index) => (
        <React.Fragment key={index}>
          <ToastNotification
            className="mb-1"
            kind={notification?.kind}
            role={notification?.role || "status"}
            // timeout={5000}
            title={notification?.title || "Alert"}
            subtitle={notification?.subtitle || ""}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default Notifications;
