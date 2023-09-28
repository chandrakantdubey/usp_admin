import { HeaderPanel, Button } from "@carbon/react";
import { CloseLarge } from "@carbon/icons-react";

const SidePanel = ({ isSideNavExpanded, closePanel, panelContent }) => {
  return (
    <HeaderPanel expanded={isSideNavExpanded}>
      {isSideNavExpanded && (
        <>
          <Button kind="ghost" onClick={closePanel}>
            <CloseLarge />
          </Button>
          <br />
          <br />
          {panelContent}
        </>
      )}
    </HeaderPanel>
  );
};

export default SidePanel;
