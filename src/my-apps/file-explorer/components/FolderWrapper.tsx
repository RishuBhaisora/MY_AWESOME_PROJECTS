import React, { FC, memo, useState } from "react";
import useTraverseTree from "../../hooks/useTraverseTree";
import { data } from "../mock-data/data";
import Folder from "./Folder";

type FolderWrapperProps = {};

const FolderWrapper: FC<FolderWrapperProps> = (props) => {
  const [explorerData, setExplorerData] = useState(data);

  const { insertNode, deleteNode, editNode } = useTraverseTree();
  const handleInsertNode = (folderId: string, item: any, isFolder: boolean) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };
  const handleDeleteNode = (idToDelete: string) => {
    const finalTree = deleteNode(explorerData, idToDelete);
    setExplorerData(finalTree);
  };
  const handleEditNode = (idToEdit: string, item: string) => {
    const finalTree = editNode(explorerData, idToEdit, item);
    setExplorerData(finalTree);
  };
  if (Object.keys(explorerData).length > 2) {
    return (
      <div className="bg-green-700 h-screen p-10 overflow-auto">
        <Folder
          key={explorerData.id}
          handleInsertNode={handleInsertNode}
          handleDeleteNode={handleDeleteNode}
          handleEditNode={handleEditNode}
          data={explorerData}
        />
      </div>
    );
  } else {
    return (
      <div
        className="cursor-pointer flex h-screen justify-center items-center text-2xl font-bold underline text-sky-700 "
        onClick={() => setExplorerData(data)}
      >
        Get Dummy Data
      </div>
    );
  }
};

FolderWrapper.defaultProps = {};

export default memo(FolderWrapper);
