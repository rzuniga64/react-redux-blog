import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';
import jsdomify from 'jsdomify';

let React;

describe('App' , () => {

    jsdomify.create();
    React = require('react');
    let component;

  beforeEach(() => {
        component = renderComponent(App);
  });

  it('renders something', () => {
        expect(component).to.exist;
  });
});
