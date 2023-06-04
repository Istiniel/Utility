import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { mockAnimes } from './src/mocks/mockAnimes';

const server = setupServer(
  rest.get('https://api.jikan.moe/v4/anime?q=crater&sfw', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAnimes));
  }),
  rest.get('https://api.jikan.moe/v4/anime/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockAnime));
  }),
  rest.get('*', (req, res, ctx) => {
    console.log(`Please add request handler for ${req.url.toString()}`);
    return res(ctx.status(500), ctx.json({ error: 'Please add request handler' }));
  })
);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

export { server, rest };
