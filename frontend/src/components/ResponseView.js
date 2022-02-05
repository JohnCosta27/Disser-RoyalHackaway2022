import React from "react";
import Diss from "./disses/Diss";
const ResponseView = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-4">
      <div className="w-full flex flex-col">
        <Diss diss="Diss 1.0" name="Shrey" />
        <Diss diss="Diss 2.0" name="John" />
        <Diss diss="Diss 3.0" name="James" />
        <Diss diss="Diss 4.0" name="Dawg" />
      </div>
      <div className="w-full flex flex-col">
        <Diss diss="Diss 1.0" name="Shrey" />
        <Diss diss="Diss 2.0" name="John" />
        <Diss diss="Diss 3.0" name="James" />
        <Diss diss="Diss 4.0" name="Dawg" />
      </div>
      <div className="w-full flex flex-col">
        <Diss diss="Diss 1.0" name="Shrey" />
        <Diss diss="Diss 2.0" name="John" />
        <Diss diss="Diss 3.0" name="James" />
        <Diss diss="Diss 4.0" name="Dawg" />
      </div>
      <div className="w-full flex flex-col">
        <Diss diss="Diss 1.0" name="Shrey" />
        <Diss diss="Diss 2.0" name="John" />
        <Diss diss="Diss 3.0" name="James" />
        <Diss diss="Diss 4.0" name="Dawg" />
      </div>
    </div>
  );
};
export default ResponseView;
