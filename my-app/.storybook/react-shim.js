// This file provides shims for React 18 compatibility with Storybook
import * as ReactDom from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

// Export the required modules that Storybook is looking for
export const reactDomTestUtils = TestUtils;
export const reactDomClient = ReactDom.createRoot ? ReactDom : null;

// Export a fake react-18 module that Storybook is trying to import
export default {
  renderToString: ReactDom.renderToString,
  version: '18.0.0'
};
