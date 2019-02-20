import React, { Component } from 'react';
import raphael from 'raphael';

export const createPathElement = (id, path) => {
  return <path
      id={id}
      d={path}
      vectorEffect='non-scaling-stroke'
      stroke-width='1'
      stroke='black'
      fill='none'
      >
    </path>
}

export const getHeight = (pathString) => {
  const height = raphael.pathBBox(pathString).height;
  return height
}

export const getWidth = (pathString) => {
  const width = raphael.pathBBox(pathString).width;
  return width
}

export const getTopLeftX = (pathString) => {
  const topLeftX = raphael.pathBBox(pathString).x;
  return topLeftX
}

export const getTopLeftY = (pathString) => {
  const topLeftY = raphael.pathBBox(pathString).y;
  return topLeftY
}

export const centerAndScalePath = () => {

}



