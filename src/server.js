import app from './app';
import logger from './helpers/logger';

const port = process.env.PORT;
const server = app.listen(port, () => {
  let host = server.address().address;
  host = host === '::' ? 'localhost' : host;
  logger.info('listening at http://%s:%s', host, port);
  logger.debug('listening at http://%s:%s', host, port);
});
