import { beforeEach, before, afterEach, after, describe, it, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { list } from '../../src/fs/list.js';
import { promises as fs } from 'node:fs';
import { dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folder = `${__dirname}/../../src/fs/files`;
const tmpFolder = `${__dirname}/../../src/fs/files_tmp`;

/**
 * list.js
 * implement function that prints array of all filenames from files folder into console
 * if files folder doesn't exists Error with message `FS operation failed` must be thrown
 */

const contentAsString = "dontLookAtMe.txt,fileToRead.txt,fileToRemove.txt,hello.txt,wrongFilename.txt"
const contentAsStringList = [
  'dontLookAtMe.txt',
  'fileToRead.txt',
  'fileToRemove.txt',
  'hello.txt',
  'wrongFilename.txt'

]

describe('List', async () => {

  describe('`files` folder exists', async () => {
    
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
      await list();
      assert.deepStrictEqual(
        contentAsStringList,
        consoleOutput
      )
    });
    
  });
  
  describe('`files` folder does not exist', async () => {
    
    beforeEach(async() => {
      await fs.rename(folder, tmpFolder);
    });

    afterEach(async() => {
      await fs.rename(tmpFolder, folder);
    });

    it('Throws Error', async () => {
      try {
        await list();
        assert.fail();
      } catch (err) {
        assert.strictEqual(err.message, 'FS operation failed');
      }
    });

  });

});  

