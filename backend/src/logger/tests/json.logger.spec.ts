import { JsonLogger } from '../json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log messages in JSON format', () => {
    logger.log('Test message', 'param1', 'param2');
    expect(consoleSpy).toHaveBeenCalledWith(
      '{"level":"log","message":"Test message","optionalParams":["param1","param2"]}',
    );
  });
});
