import React, { Component } from "react";

export interface FolderClassBasedProps {
  handleInsertNode: any;
  data: any;
  handleEditNode: any;
  handleDeleteNode: any;
}
export interface FolderClassBasedState {
  clicked: boolean;
  newData: any;
  addNew: {
    isOpen: boolean;
    isFolder: boolean;
    name: string;
  };
}

class FolderClassBased extends Component<
  FolderClassBasedProps,
  FolderClassBasedState
> {
  constructor(props: FolderClassBasedProps) {
    super(props);
    this.state = {
      clicked: false,
      newData: this.props.data,
      addNew: {
        isOpen: false,
        isFolder: true,
        name: "",
      },
    };
  }

  handleKeyDown(e: any) {
    if (e.keyCode === 13) {
      this.props.handleInsertNode(
        this.props.data.id,
        e.target.value,
        this.state.addNew.isFolder
      );
      this.setAddNew("", false);
    }
  }
  setClicked(clicked: boolean) {
    this.setState({ clicked: clicked });
  }
  setAddNew(
    name: string = "",
    isOpen: boolean = this.state.addNew.isOpen,
    isFolder: boolean = this.state.addNew.isFolder
  ) {
    this.setState({
      addNew: {
        ...this.state.addNew,
        isOpen,
        isFolder,
        name,
      },
    });
  }
  render() {
    const isOpen = this.state.addNew.isOpen;
    const addNew = this.state.addNew;
    const newData = this.props.data;
    if (newData.isFolder) {
      return (
        <div>
          <span className="flex bg-orange-400  w-60 h-10 m-9  justify-between cursor-pointer ">
            <div
              className="font-bold w-1/2"
              onClick={() => this.setClicked(!this.state.clicked)}
            >
              📁{newData.name}
            </div>
            <button
              disabled={isOpen && addNew.isFolder}
              onClick={() => {
                this.setAddNew("", true, true);
                this.setClicked(true);
              }}
              className="bg-red-200 p-1"
            >
              +folder
            </button>
            <button
              disabled={isOpen && !addNew.isFolder}
              onClick={() => {
                this.setAddNew("", true, false);
                this.setClicked(true);
              }}
              className="bg-red-200 p-2"
            >
              +file
            </button>
          </span>

          {isOpen && (
            <div className="pl-10 ">
              {addNew.isFolder ? "📁" : "📄"}
              <input
                value={addNew.name}
                onChange={(e) => this.setAddNew(e.target.value)}
                className="outline-none p-1 rounded-md"
                onKeyDown={(e) => this.handleKeyDown(e)}
                autoFocus
                onBlur={() => this.setAddNew("", false)}
              />
            </div>
          )}
          <div className="pl-10 ">
            {this.state.clicked &&
              (newData.items ?? []).map((itm: any) => (
                <FolderClassBased
                  key={itm.id}
                  handleDeleteNode={this.props.handleDeleteNode}
                  handleEditNode={this.props.handleDeleteNode}
                  handleInsertNode={this.props.handleInsertNode}
                  data={itm}
                />
              ))}
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
  }
}

export default FolderClassBased;
