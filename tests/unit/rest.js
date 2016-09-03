import rest from '../../src/rest';

const P = Promise;
const match = sinon.match;

describe('rest', () => {

  describe('.Client', () => {

    describe('#url()', () => {
      it('derives a proxy url', () => {
        let client = new rest.Client({
          proxy: {scheme: 'https', host: 'api.local:3000', path: '/api'},
        });

        let expected = 'https://api.local:3000/api/foo/bar';
        let actual = client.url('/foo/bar');

        expect(actual).to.equal(expected);
      });

      it('derives a proxy url with query parameters', () => {
        let client = new rest.Client({
          proxy: {scheme: 'https', host: 'api.local:3000', path: '/api'},
        });

        let expected = 'https://api.local:3000/api/foo/bar?a=1&b=2';
        let actual = client.url('/foo/bar', {a: 1, b: 2});

        expect(actual).to.equal(expected);
      });
    });

    describe('#get()', () => {
      it('sends a GET request', (done) => {
        let fetch = sinon.stub();
        let response = {ok: true};
        let promise = P.resolve(response);
        let client = new rest.Client({fetch: {algo: fetch}});

        fetch.withArgs(match.string, match.object).returns(promise);

        client.get('/foo/bar').then((res) => {
          expect(res).to.equal(response);
          done();
        });
      });

      it('throws an Error on non-OK response', (done) => {
        let fetch = sinon.stub();
        let response = {ok: false};
        let promise = P.resolve(response);
        let client = new rest.Client({fetch: {algo: fetch}});

        fetch.withArgs(match.string, match.object).returns(promise);

        client.get('/foo/bar')
        .then((res) => expect.fail())
        .catch((e) => done());
      });

    });

  });

  describe('.resources', () => {

  });

});
