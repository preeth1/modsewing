import React, { Component } from 'react';
import { createPathElement } from './../svgHelpers/elements'

it('creates path element', () => {
	let id = 'testId';
	let path = 'M 0 0';
	let pathElement = createPathElement(id, path);
	pathElement = <path
					id='testId'
					d='M 0 0'
					vectorEffect="non-scaling-stroke"
					stroke-width="1"
					stroke="black"
					fill="none"
					>
				    </path>;
});