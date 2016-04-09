const assert = require('assert');
import L from '../';

describe('lineral', () => {
  let obj;

  before(() => {
    obj = {
      'foo': 'bar',
      'say': { 'hello': 'world' },
      'this': { 'is': { 'four': { 'level': 'nested' } } }
    };
  });

  describe('when the path is null', () => {
    it('returns null', () => {
      assert.equal(true, L(obj, null) === null);
    });
  });

  describe('when the path is a property of the obj', () => {
    it('returns the value', () => {
      assert.equal(obj.foo, L(obj, 'foo'));
    });
  });

  describe('when the path is NOT a property of the obj', () => {
    it('returns null', () => {
      assert.equal(true, L(obj, 'zoo') === null);
    });
  });

  describe('when the path is a sequence of properties', () => {
    it('returns the nested value or object reference', () => {
      assert.equal(obj.say.hello, L(obj, 'say.hello'));
      assert.equal(obj.this.is.four, L(obj, 'this.is.four'));
    });
  });

  describe('when the path is an INVALID sequence of properties', () => {
    it('returns null', () => {
      assert.equal(true, L(obj, 'foo.hello') === null);
    });
  });

  describe('currying', () => {
    it('returns the same value as the non-currying calls', () => {
      const myL = L(obj);
      assert.equal(L(obj, 'foo'), myL('foo'));
      assert.equal(L(obj, 'say.hello'), myL('say.hello'));
      assert.equal(L(obj, 'zoo.topia'), myL('zoo.topia'));
    });
  });

  describe('when the path includes arrays', () => {
    let objWithArr;
    beforeEach(() => {
      objWithArr = {
        'array': [ { 'zero': 0 }, [ { 'one': 1 }, { 'two': 2 } ] ]
      };
    });

    describe('when the objec is an array', () => {
      it('returns the value', () => {
        assert.equal(0, L([0, 1], '[0]'));
      });
    });

    describe('when the path exists and is valid', () => {
      it('returns the value', () => {
        assert.equal(0, L(objWithArr, 'array.[0].zero'));
        assert.equal(2, L(objWithArr, 'array.[1].[1].two'));
      });
    });

    describe('when the path does NOT exist', () => {
      it('returns null', () => {
        assert.equal(true, L(objWithArr, 'array.foo.[0]') === null);
      });
    });

    describe('when the index is larger than the array length', () => {
      it('returns null', () => {
        assert.equal(true, L(objWithArr, 'array.[5]') === null);
        assert.equal(true, L(objWithArr, 'array.[1][2].two') === null);
      });
    });
  });
});
