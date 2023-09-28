import { connect } from "react-redux";
import { Column } from "@carbon/react";
import { useState, useEffect } from "react";

function getGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

function WelcomeBanner({ userName }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update time every second

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  const greeting = getGreeting();
  return (
    <Column className="margin-bottom welcome-banner" lg={16} md={8} span={4}>
      <h1>
        {greeting}, {userName}👋
      </h1>
      <p>Here is what’s happening with your projects today.</p>
      <p>{time.toLocaleTimeString()}</p>
    </Column>
  );
}

// export default WelcomeBanner;

const mapStateToProps = (state) => ({
  userName: state.profile.profileData.data.last_name, // Replace 'user.name' with the actual path in your Redux state
});

export default connect(mapStateToProps)(WelcomeBanner);
