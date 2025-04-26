import { beforeEach, afterEach, describe, it, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { create } from '../../src/fs/create.js';
import { promises as fs } from 'node:fs';
import { dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const freshFile = `${__dirname}/../../src/fs/files/fresh.txt`;


describe('Create', async () => {

  beforeEach(async () => {
    try {
      await fs.unlink(freshFile);
    } catch (err) {
    }
  });
  
  afterEach(async () => {
    try {
      await fs.unlink(freshFile);
    } catch (err) {
    }
  });
  
  it('Create', async () => {
    // File should not exist initially
    try {
      await fs.access(freshFile);
      assert.fail('`fresh.txt` should not exist initially');
    } catch (err) {
      // Confirm `access` and not `assert.fail` caused the failure
      assert.strictEqual(err.syscall, 'access');
    }
    
    await create();
    
    // File should exist after `create` has been invoked
    try {
      await fs.access(freshFile);
      assert.strictEqual(true, true);
    } catch (err) {
      assert.strictEqual(true, false);
    }
  
    // Further invokes of `create` should throw an error with the message 'FS operation failed'
    try {
      await create();
    } catch (err) {
      assert.strictEqual(err.message, 'FS operation failed')
    }
  });

});  
