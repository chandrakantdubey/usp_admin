import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  SideNav,
  SideNavItems,
  SideNavLink,
  HeaderSideNavItems,
  HeaderMenuItem,
  Popover,
  PopoverContent,
  HeaderNavigation,
  Theme,
} from "@carbon/react";
import {
  User,
  Logout,
  Dashboard,
  Api_1,
  UserAdmin,
  Currency,
  Light,
  AsleepFilled,
} from "@carbon/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { logUserOut } from "src/auth/authUtils";

let sideNavLinks = [
  {
    path: "/dashboard",
    text: "Dashboard",
    icon: Dashboard,
  },
  {
    path: "/apis",
    text: "APIs",
    icon: Api_1,
  },
  {
    path: "/charge-bee",
    text: "ChargeBee",
    icon: Currency,
  },
  {
    path: "/user-access",
    text: "User Access",
    icon: UserAdmin,
  },
];

const headerNavLinks = [
  {
    path: "/charge-bee/invoices",
    text: "Invoices",
    icon: Currency,
  },
  {
    path: "/charge-bee/customers",
    text: "Customers",
    icon: Currency,
  },
  {
    path: "/charge-bee/subscriptions",
    text: "Subscriptions",
    icon: Currency,
  },
];

const MainHeader = ({ data }) => {
  const navigate = useNavigate();
  const [openTwo, setOpenTwo] = useState(false);

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Uvation USP">
            <HeaderMenuButton
              aria-label={isSideNavExpanded ? "Close menu" : "Open menu"}
              onClick={onClickSideNavExpand}
              isActive={isSideNavExpanded}
              aria-expanded={isSideNavExpanded}
            />

            <HeaderName to="/dashboard" prefix="" as={Link}>
              <div className="text-center">
                <img
                  src="/favicon.ico"
                  height={25}
                  alt=""
                  style={{
                    filter:
                      localStorage.getItem("theme") == "g100"
                        ? "invert(0)"
                        : "invert(1)",
                    display: "block",
                  }}
                />
              </div>
              &nbsp; Uvation USP
            </HeaderName>

            <HeaderNavigation aria-label="Uvation USP">
              {headerNavLinks.map((link) => (
                <HeaderMenuItem
                  to={link.path}
                  as={Link}
                  key={link.path}
                  isActive={window.location.pathname === link.path}
                >
                  {link.text}
                </HeaderMenuItem>
              ))}
            </HeaderNavigation>

            <HeaderGlobalBar>
              <HeaderGlobalAction
                aria-label={
                  localStorage.getItem("theme") === "white" ? "Light" : "Dark"
                }
                onClick={() => {
                  localStorage.getItem("theme") === "white"
                    ? localStorage.setItem("theme", "g90")
                    : localStorage.setItem("theme", "white");

                  window.location.reload();
                }}
              >
                {localStorage.getItem("theme") === "white" ? (
                  <Light />
                ) : (
                  <AsleepFilled />
                )}
              </HeaderGlobalAction>
              <HeaderGlobalAction
                aria-label="Profile"
                onClick={() => setOpenTwo(!openTwo)}
              >
                <Popover open={openTwo} autoAlign>
                  <User size={20} />
                  <PopoverContent>
                    <Theme
                      theme={
                        localStorage.getItem("theme") === "g10" ? "g90" : "g10"
                      }
                    >
                      <div className="profile-menu">
                        <h5>Username - {data?.user_name}</h5>
                        <h5 className="text-capitalize">
                          Name - {data?.first_name + " " + data?.last_name}
                        </h5>
                        <h5>Role - {data?.role}</h5>
                      </div>
                    </Theme>
                  </PopoverContent>
                </Popover>
              </HeaderGlobalAction>
              <HeaderGlobalAction aria-label="Logout" onClick={logUserOut}>
                <Logout size={20} />
              </HeaderGlobalAction>
            </HeaderGlobalBar>

            <SideNav
              aria-label="Side navigation"
              expanded={isSideNavExpanded}
              onSideNavBlur={onClickSideNavExpand}
            >
              <SideNavItems hasDivider={true}>
                {sideNavLinks.map((link) => (
                  <SideNavLink
                    key={link.path}
                    renderIcon={link.icon}
                    large
                    onClick={() => navigate(link.path)}
                    isActive={window.location.pathname === link.path}
                  >
                    {link.text}
                  </SideNavLink>
                ))}
                <HeaderSideNavItems hasDivider={true}>
                  {headerNavLinks.map((link) => (
                    <HeaderMenuItem
                      to={link.path}
                      as={Link}
                      key={link.path}
                      isActive={window.location.pathname === link.path}
                    >
                      {link.text}
                    </HeaderMenuItem>
                  ))}
                </HeaderSideNavItems>
              </SideNavItems>
            </SideNav>
          </Header>
        </>
      )}
    />
  );
};

export default MainHeader;
