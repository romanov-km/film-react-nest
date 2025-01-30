import { TskvLogger } from '../tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log messages in TSKV format', () => {
    logger.log('Test message', 'param1', 'param2');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'level=log\tmessage=Test message\tparam0=param1\tparam1=param2',
    );
  });

  it('should log error messages in TSKV format', () => {
    logger.error('Error message', 'errorDetail1', 'errorDetail2');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'level=error\tmessage=Error message\tparam0=errorDetail1\tparam1=errorDetail2',
    );
  });

  it('should log warnings in TSKV format', () => {
    logger.warn('Warning message', 'warningDetail');
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      'level=warn\tmessage=Warning message\tparam0=warningDetail',
    );
  });

  it('should log debug messages in TSKV format', () => {
    logger.debug('Debug message', 'debugDetail');
    expect(consoleDebugSpy).toHaveBeenCalledWith(
      'level=debug\tmessage=Debug message\tparam0=debugDetail',
    );
  });

  it('should log verbose messages in TSKV format', () => {
    logger.verbose('Verbose message', 'verboseDetail');
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'level=verbose\tmessage=Verbose message\tparam0=verboseDetail',
    );
  });
});
