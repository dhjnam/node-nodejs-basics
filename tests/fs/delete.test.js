import { beforeEach, before, afterEach, after, describe, it, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { remove } from '../../src/fs/delete.js';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileToRemove = `${__dirname}/../../src/fs/files/fileToRemove.txt`;
const tmpFileToRemove = `${__dirname}/../../src/fs/files/tmpFileToRemove.tmp`;

/**
 * delete.js
 * implement function that deletes file `fileToRemove.txt` 
 * if
 * - there's no file fileToRemove.txt Error with message `FS operation failed` must be thrown
 */

describe('Delete', async () => {
  
  beforeEach(async () => {
    try {
      await fs.cp(fileToRemove, tmpFileToRemove);
    } catch (err) {}
  });

  afterEach(async () => {
    try {
      await fs.cp(tmpFileToRemove, fileToRemove);
    } catch (err) {}
    try {
      await fs.rm(tmpFileToRemove);
    } catch (err) {}
  });
  
  it('`fileToRemove.txt` exists', async () => {
    // Verify `fileToRemove.txt` does exists
    await fs.access(fileToRemove);
    await remove();
    // `fileToRemove.txt` should not exist anymore
    try {
      await fs.access(fileToRemove);
      assert.fail('`fileToRemove.txt` still exists')
    } catch (err) {
      assert.strictEqual(err.syscall, 'access');
    }
  });
  
  it('`fileToRemove.txt` does not exist', async () => {
    // Verify `fileToRemove.txt` does not exist
    await remove();
    try {
      await fs.access(fileToRemove);
      assert.fail('`fileToRemove.txt` exists')
    } catch (err) {
      assert.strictEqual(err.syscall, 'access');
    }

    try {
      await remove();
    } catch (err) {
      assert.strictEqual(err.message, 'FS operation failed');
    }
  });
});  

