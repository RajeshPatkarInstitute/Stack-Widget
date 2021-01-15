/**
 * create a constructor for Stack
 * 
 */

const assert = require('assert');
const fs = require('fs');
const sinon = require('sinon');
const expect = require('chai').expect;
const path = require('path');

const Stack = require('../staas/stack');

describe('Stack model', function () {
    it('can construct a Stack object', function () {
        let st = new Stack(10);
        assert.strictEqual(st.uuid,10);
    });
    it('can create an empty Stack in tatva', function () {
        let writeFileSync = sinon.stub(fs,'writeFileSync').returns({});
        let st = new Stack(10);
        let name = `${path.resolve('./staas')}/StackStore/${st.uuid.toString()}.json`;
        st.toTatva();
        console.log(st.count);
        assert.strictEqual(st.count,0);
        assert.strictEqual(st.uuid,10);
        expect(writeFileSync.calledOnceWith(name,JSON.stringify([]))).to.be.true;
    });
 });
