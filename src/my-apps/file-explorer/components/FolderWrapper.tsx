import React, { FC, memo } from "react";
import { data } from "../mock-data/data";
import Folder from "./Folder";

type FolderWrapperProps = {};

const FolderWrapper: FC<FolderWrapperProps> = (props) => {
  return (
    <div className="bg-green-700 h-screen p-10 overflow-auto">
      <Folder data={data} />
    </div>
  );
};

FolderWrapper.defaultProps = {};

export default memo(FolderWrapper);
