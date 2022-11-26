import React, { FC, memo, useState } from "react";

type FolderProps = {
  data: any;
};

const Folder: FC<FolderProps> = ({ data }) => {
  const [clicked, setClicked] = useState(false);
  const [newData, setNewData] = useState(data);
  const [addNew, setAddNew] = useState({
    isOpen: false,
    isFolder: true,
    name: "",
  });
  console.log(newData);

  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      setNewData({
        ...newData,
        items: [...(newData.items ?? []), { ...addNew }],
      });
      setAddNew({
        isOpen: false,
        isFolder: true,
        name: "",
      });
    }
  };

  if (newData.isFolder) {
    return (
      <div>
        <span className="flex bg-orange-400  w-60 h-10 m-9  justify-between cursor-pointer ">
          <div className="font-bold w-1/2" onClick={() => setClicked(!clicked)}>
            📁{newData.name}
          </div>
          <button
            onClick={() => {
              setAddNew({ ...addNew, isOpen: !addNew.isOpen, isFolder: true });
              setClicked(true);
            }}
            className="bg-red-200 p-1"
          >
            +folder
          </button>
          <button
            onClick={() => {
              setAddNew({ ...addNew, isOpen: !addNew.isOpen, isFolder: false });
              setClicked(true);
            }}
            className="bg-red-200 p-2"
          >
            +file
          </button>
        </span>

        {addNew.isOpen && (
          <div className="pl-10 ">
            {addNew.isFolder ? "📁" : "📄"}
            <input
              value={addNew.name}
              onChange={(e) => setAddNew({ ...addNew, name: e.target.value })}
              className="outline-none p-1 rounded-md"
              onKeyDown={handleKeyDown}
              autoFocus
              onBlur={() => setAddNew({ ...addNew, isOpen: false, name: "" })}
            />
          </div>
        )}
        <div className="pl-10 ">
          {clicked &&
            (newData.items ?? []).map((itm: any) => <Folder data={itm} />)}
        </div>
      </div>
    );
  } else {
    return (
      <div className=" p-1 pl-6 bg-slate-300 rounded-br-md w-60 h-8 m-9 font-bold">
        📄{newData.name}
      </div>
    );
  }
};

Folder.defaultProps = {};

export default memo(Folder);
