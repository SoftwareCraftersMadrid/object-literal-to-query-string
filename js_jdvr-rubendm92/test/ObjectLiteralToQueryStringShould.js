'use strict';

const expect = require('chai').expect;
const objectToQueryString = require('../src/ObjectLiteralToQueryString');

describe('Convert object literal to query string', () => {

  it('should return empty string if parameter is not an object or is empty', () => {
    expect(objectToQueryString("noObject")).to.equal("");
    expect(objectToQueryString({})).to.equal("");
  });

  it('should return a simple query string for a one level object', () => {
    expect(objectToQueryString({prop: 'value'})).to.equal("prop=value");
    expect(objectToQueryString({prop: 'value', p2: 'v2'})).to.equal("prop=value&p2=v2");
  });

  it('should return a query string for a multilevel object', () => {
    expect(objectToQueryString({p: {p2: 'value'}})).to.equal("p[p2]=value");
    const obj = {
         prop0: "val0",
         level1: {
            prop1: "val1",
            level2:{
               prop2:"val2"
            }
        }
    };
    expect(objectToQueryString(obj))
    .to.equal("prop0=val0&level1[prop1]=val1&level1[level2][prop2]=val2");
  });
});
