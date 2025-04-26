import { beforeEach, before, afterEach, after, describe, it, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { read } from '../../src/fs/read.js';
import { promises as fs } from 'node:fs';
import { dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileToRead = `${__dirname}/../../src/fs/files/fileToRead.txt`;
const tmpFileToRead = `${__dirname}/../../src/fs/files/tmpFileToRead.txt`;

/**
 * read.js
 * implement function that prints content of the `fileToRead.txt` into console 
 * if there's no file fileToRead.txt Error with message FS operation failed must be thrown
 */

const content = [
  'My content',
  'should',
  'be',
  'printed',
  'into',
  'console',
  '!',
]
content.join('\n');

describe('Read', async () => {

  describe('`fileToRead.txt` exists', async () => {
    
    let consoleOutput;
    const originalConsoleLog = console.log;
    
    beforeEach(async () => {
      consoleOutput = [];
      // Mock the behaviour of console.log
      console.log = (...args) => {
        consoleOutput.push(args.join(' '));
      };
    });

    afterEach(async () => {
      console.log = originalConsoleLog;
    });

    it('Logs files to console', async () => {
      await read();
      assert.deepStrictEqual(
        content,
        consoleOutput
      )
    });
    
  });
  
  describe('`fileToRead.txt` does not exist', async () => {
    
    beforeEach(async() => {
      await fs.rename(fileToRead, tmpFileToRead);
    });

    afterEach(async() => {
      await fs.rename(tmpFileToRead, fileToRead);
    });

    it('Throws Error', async () => {
      try {
        await read();
        assert.fail();
      } catch (err) {
        assert.strictEqual(err.message, 'FS operation failed');
      }
    });

  });

});  

