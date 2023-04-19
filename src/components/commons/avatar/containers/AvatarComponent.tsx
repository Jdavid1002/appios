import React, { Component } from "react";

import LayoutComponent from "../components/layoutComponent";

interface AvatarComponentProps {
  name: string;
  width?: number;
  height?: number;
  color?: string;
}

class AvatarComponent extends Component<AvatarComponentProps> {
  render() {
    return <LayoutComponent {...this.props} />;
  }
}

export default AvatarComponent;
