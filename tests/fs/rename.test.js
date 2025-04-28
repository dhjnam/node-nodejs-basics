import { beforeEach, before, afterEach, after, describe, it, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { rename } from '../../src/fs/rename.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wrongFilename = `${__dirname}/../../src/fs/files/wrongFilename.txt`;
const properFilename = `${__dirname}/../../src/fs/files/properFilename.md`;
const properFilenameDummy = `${__dirname}/../../src/fs/files/properFilename.md`;
const tmpFilename = `${__dirname}/../../src/fs/files/tmpFilename.tmp`;

/**
 * rename.js 
 * implement function that renames file `wrongFilename.txt` to properFilename with extension `.md`
 * if 
 * - there's no file `wrongFilename.txt` or
 * - `properFilename.md` already exists 
 * Error with message `FS operation failed` must be thrown)
 */

describe('Rename', async () => {
  
  beforeEach(async () => {
    try {
      await fs.rename(properFilename, wrongFilename);
    } catch (err) { }
    try {
      await fs.rename(tmpFilename, wrongFilename);
    } catch (err) { }
    try {
      await fs.rm(properFilenameDummy);
    } catch (err) { }
  });
  
  afterEach(async () => {
    try {
      await fs.rename(properFilename, wrongFilename);
    } catch (err) { }
    try {
      await fs.rename(tmpFilename, wrongFilename);
    } catch (err) { }
    try {
      await fs.rm(properFilenameDummy);
    } catch (err) { }
  });
  
  it('`wrongFilename.txt` exists', async () => {
    // `wrongFilename.txt` should exist
    await fs.access(wrongFilename);
    // `properFilename.md` should not exist
    try {
      await fs.access(properFilename);
      assert.fail('`properFilename.md` exists');
    } catch (err) {
      if (err.message === '`properFilename.md` exists') {
        throw err;
      }
    }
    await rename();
    // `properFilename.md` should exist
    await fs.access(properFilename);
    // `wrongFilename.txt` should not exist
    try {
      await fs.access(wrongFilename);
      assert.fail('`wrongFilename.txt` exists');
    } catch (err) {
      if (err.message === '`wrongFilename.txt` exists') {
        throw err;
      }
    }
  });

  it('`wrongFilename.txt` does not exists', async () => { 
    await fs.rename(wrongFilename, tmpFilename);

    // Check that `wrongFilename.txt` does not exist
    try {
      await fs.access(wrongFilename);
    } catch (err) {
      assert.strictEqual(err.syscall, 'access');
    }

    try {
      await rename();
    } catch (err) {
      assert.strictEqual(err.message, 'FS operation failed');
    }
  });

  it('`properFilename.md` already exists', async () => {
    await fs.writeFile(properFilename, '');
    await fs.access(properFilename);
    await fs.access(wrongFilename);

    try {
      await rename();
    } catch (err) {
      assert.strictEqual(err.message, 'FS operation failed');
    }
  });

});  

