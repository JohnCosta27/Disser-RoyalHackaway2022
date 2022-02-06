import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { ShareIcon } from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";

const Diss = ({ id, name, diss, className }) => {
  const navigate = useNavigate();

  return (
    <div
      className={clsx(
        "w-full h-48 flex flex-col shadow-lg rounded bg-white p-4 cursor-pointer",
        className
      )}
      onClick={() => navigate(`/response?dissId=${id}`)}
    >
      <h1 className="text-4xl">{name}</h1>
      <h1 className="text-lg ">{diss}</h1>
      <div className="flex items-end h-full">
        <HeartIcon className="flex w-full h-12 px-2 justify-start" />
        <div style={{ color: "red" }}>
          <HeartIcon size={32} />
        </div>
        <ShareIcon className="flex w-full h-12 px-2 justify-start" />
      </div>
    </div>
  );
};
export default Diss;
