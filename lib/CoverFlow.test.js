var _jsxFileName = '/Users/leon/Desktop/coverflow-react/src/CoverFlow/CoverFlow.test.js',
    _this = this;

// CoverFlow.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import CoverFlow from './CoverFlow';

test('if there are no items, CoverFlow has an EmptyContainer component child, otherwise it has Container component child', function () {
  var emptyCoverFlow = renderer.create(React.createElement(CoverFlow, { imagesArr: [], __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    },
    __self: _this
  }));
  var tree = emptyCoverFlow.toJSON();
  expect(tree).toMatchSnapshot();
  var fullCoverFlow = renderer.create(React.createElement(CoverFlow, { imagesArr: ['img/1.png'], __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: _this
  }));
  tree = fullCoverFlow.toJSON();
  expect(tree).toMatchSnapshot();
});