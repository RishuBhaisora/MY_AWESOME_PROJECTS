import React, { FC, memo, useState } from "react";

type FolderProps = {
  data: any;
  handleInsertNode: any;
  handleDeleteNode: any;
  handleEditNode: any;
};

const Folder: FC<FolderProps> = ({
  data,
  handleInsertNode,
  handleDeleteNode,
  handleEditNode,
}) => {
  const [clicked, setClicked] = useState(false);
  const [addNew, setAddNew] = useState({
    isOpen: false,
    isFolder: true,
  });
  const [isEdit, setIsEdit] = useState(false);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      handleInsertNode(data.id, e.target.value, addNew.isFolder);
      setAddNew({
        isOpen: false,
        isFolder: true,
      });
    }
  };
  const handleDelete = () => {
    handleDeleteNode(data.id);
  };
  const handleEdit = (e: any) => {
    if (e.keyCode === 13) {
      handleEditNode(data.id, e.target.value);
    }
  };
  const renderDelete = () => {
    return <button onClick={handleDelete}>Delete</button>;
  };
  const renderEdit = () => {
    return <button onClick={() => setIsEdit(!isEdit)}>EDIT</button>;
  };
  const renderInput = () => {
    if (addNew.isOpen || isEdit) {
      return (
        <div className="pl-10 ">
          {addNew.isFolder ?? isEdit ? "📁" : "📄"}
          <input
            type={"text"}
            className="outline-none p-1 rounded-md"
            onKeyDown={isEdit ? handleEdit : handleKeyDown}
            autoFocus
            onBlur={() => {
              setIsEdit(false);
              setAddNew({ ...addNew, isOpen: false });
            }}
          />
        </div>
      );
    }
  };

  if (data.isFolder) {
    return (
      <div>
        <span className="flex bg-orange-400  w-1/2 h-10 m-9  justify-between cursor-pointer ">
          <div className="font-bold w-1/2" onClick={() => setClicked(!clicked)}>
            📁{data.name}
          </div>
          <button
            disabled={addNew.isOpen && addNew.isFolder}
            onClick={() => {
              setAddNew({ ...addNew, isOpen: !addNew.isOpen, isFolder: true });
              setClicked(true);
            }}
            className="bg-red-200 p-1"
          >
            +folder
          </button>
          <button
            disabled={addNew.isOpen && !addNew.isFolder}
            onClick={() => {
              setAddNew({ ...addNew, isOpen: !addNew.isOpen, isFolder: false });
              setClicked(true);
            }}
            className="bg-red-200 p-2"
          >
            +file
          </button>

          {renderDelete()}
          {renderEdit()}
        </span>
        {renderInput()}
        <div className="pl-10 ">
          {clicked &&
            (data.items ?? []).map((itm: any) => (
              <Folder
                key={itm.id}
                handleDeleteNode={handleDeleteNode}
                handleInsertNode={handleInsertNode}
                handleEditNode={handleEditNode}
                data={itm}
              />
            ))}
        </div>
      </div>
    );
  } else if (data.name) {
    return (
      <div className=" p-1 pl-6 flex justify-between bg-slate-300  w-60 h-8 m-9">
        <span className=" font-bold"> 📄{data.name}</span> {renderDelete()}
      </div>
    );
  } else return <></>;
};

Folder.defaultProps = {};

export default memo(Folder);
