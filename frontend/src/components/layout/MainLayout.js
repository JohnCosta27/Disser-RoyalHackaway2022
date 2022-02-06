import React from "react";
import DissContainer from "../disses/DissContainer";
import DissState from "../state/DissState";

const MainLayout = () => {
  return (
    <DissState>
      <DissContainer />
    </DissState>
  );
};
export default MainLayout;
