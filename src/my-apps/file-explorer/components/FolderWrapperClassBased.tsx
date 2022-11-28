import React, { Component } from "react";
import useTraverseTree from "../../hooks/useTraverseTree";
import { data } from "../mock-data/data";
import Folder from "./Folder";
import FolderClassBased from "./FolderClassBased";

export interface FolderWrapperClassBasedProps {}
export interface FolderWrapperClassBasedState {
  explorerData: any;
}

class FolderWrapperClassBased extends Component<
  FolderWrapperClassBasedProps,
  FolderWrapperClassBasedState
> {
  constructor(props: FolderWrapperClassBasedProps) {
    super(props);
    this.state = {
      explorerData: data,
    };

    this.handleInsertNode = this.handleInsertNode.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
    this.handleEditNode = this.handleEditNode.bind(this);
  }

  handleInsertNode(folderId: string, item: any, isFolder: boolean) {
    const finalTree = useTraverseTree().insertNode(
      this.state.explorerData,
      folderId,
      item,
      isFolder
    );

    this.setState({ explorerData: finalTree });
  }
  handleDeleteNode(idToDelete: string) {
    const finalTree = useTraverseTree().deleteNode(
      this.state.explorerData,
      idToDelete
    );
    this.setState({ explorerData: finalTree });
  }
  handleEditNode(idToEdit: string, item: string) {
    const finalTree = useTraverseTree().editNode(
      this.state.explorerData,
      idToEdit,
      item
    );
    this.setState({ explorerData: finalTree });
  }

  render() {
    if (Object.keys(this.state.explorerData).length > 2) {
      return (
        <div className="bg-green-700 h-screen p-10 overflow-auto">
          class
          <FolderClassBased
            key={this.state.explorerData.id}
            handleInsertNode={this.handleInsertNode}
            handleDeleteNode={this.handleDeleteNode}
            handleEditNode={this.handleEditNode}
            data={this.state.explorerData}
          />
        </div>
      );
    } else {
      return (
        <div
          className="cursor-pointer flex h-screen justify-center items-center text-2xl font-bold underline text-sky-700 "
          onClick={() => this.setState({ explorerData: data })}
        >
          Get Dummy Data
        </div>
      );
    }
  }
}

export default FolderWrapperClassBased;
