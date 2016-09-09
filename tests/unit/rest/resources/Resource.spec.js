import { resources } from '../../../../src/rest';
import assert from 'assert';
const { Resource } = resources;
const P = Promise;
const DummyModel = class {};

describe('rest.resources.Resource', () => {

  describe('#language property', () => {
    it('reflects the client language', () => {
      let client = {language: 2};
      let resource = new Resource({client});

      expect(resource.language).to.equal(client.language);

      client.language = 3;
      expect(resource.language).to.equal(client.language);
    });
  });

  describe ('#get', () => {
    it('returns null if client raises an exception', () => {
      let client = {get: stub().throws(new Error('http-related-error'))};
      let resource = new Resource({client, root: '/foo/bar'});

      assert(resource.client === client);

      return resource.get('blah')
      .then((model) => expect(model).to.equal(null))
      .catch((e) => { 
        console.log(e);
        throw e;
      });

    });
  });
});

