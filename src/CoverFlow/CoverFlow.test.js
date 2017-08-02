// CoverFlow.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import CoverFlow from './CoverFlow';

test('if there are no items, CoverFlow has an EmptyContainer component child, otherwise it has Container component child', () => {
  const emptyCoverFlow = renderer.create(<CoverFlow imagesArr={[]} />);
  let tree = emptyCoverFlow.toJSON();
  expect(tree).toMatchSnapshot();
  const fullCoverFlow = renderer.create(<CoverFlow imagesArr={['img/1.png']} />);
  tree = fullCoverFlow.toJSON();
  expect(tree).toMatchSnapshot();
});
