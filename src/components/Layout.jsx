import React, { Component } from 'react'
import yoga, { Node } from 'yoga-layout'

export class FlexLayout extends Component {
  render () {
    const width = this.props.width || yoga.UNDEFINED
    const height = this.props.height || yoga.UNDEFINED

    var root = Node.create()
    root.setDisplay(yoga.DISPLAY_FLEX)
    root.setWidth(width)
    root.setHeight(height)
    root.setFlexDirection(yoga.FLEX_DIRECTION_ROW)
    root.setJustifyContent(yoga.JUSTIFY_FLEX_START)
    root.setFlexWrap(yoga.WRAP_WRAP)

    this.props.children.map((child, index) => {
      var childNode = Node.create();
      if (child.key > 10) {
        childNode.setWidth("10%");
      } else {
        childNode.setWidth("30%");
      }
      if (child.key > 10) {
        childNode.setHeight(50);
      } else {
        childNode.setHeight(80);
      }
      root.insertChild(childNode, index);
    })

    root.calculateLayout(width, height, yoga.DIRECTION_LTR)

    var layoutMapping = {}
    this.props.children.map((child, index) => {
      let childNode = root.getChild(index);
      const layout = {
        "layout": childNode.getComputedLayout(),
        "width": childNode.getComputedWidth(),
        "height": childNode.getComputedHeight()
      }
      layoutMapping[child.key] = layout
    })

    const childrenWithLayout = React.Children.map(this.props.children, (child) => React.cloneElement(child, { layout: layoutMapping[child.key] }))

    return childrenWithLayout
  }
}
