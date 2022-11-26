import React, { Component } from "react";
import { data } from "../mock-data/data";
import FolderClassBased from "./FolderClassBased";

export interface FolderWrapperClassBasedProps {}
export interface FolderWrapperClassBasedState {}

class FolderWrapperClassBased extends Component<
  FolderWrapperClassBasedProps,
  FolderWrapperClassBasedState
> {
  constructor(props: FolderWrapperClassBasedProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="bg-green-700 h-screen p-10 overflow-auto">
        class
        <FolderClassBased data={data} />
      </div>
    );
  }
}

export default FolderWrapperClassBased;
