import { beforeEach, before, afterEach, after, describe, it, test } from 'node:test';
import { strict as assert } from 'node:assert';
import { copy } from '../../src/fs/copy.js';
import { promises as fs } from 'node:fs';
import { dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folder = `${__dirname}/../../src/fs/files`;
const copyFolder = `${__dirname}/../../src/fs/files_copy`;

/**
 * copy.js
 * implement function that copies folder files files with all its content into folder files_copy at the same level 
 * If 
 * - files folder doesn't exist or
 * - files_copy has already been created 
 * Error with message FS operation failed must be thrown
 */

let files;
let copyFiles;

describe('Copy', async () => {

  before(async () => {
    try {
      await fs.rm(copyFolder, { recursive: true, force: true });
    } catch (err) {
      assert.fail('`files_copy` was not removed');
    }
  });
  
  after(async () => {
    try {
      await fs.rm(copyFolder, { recursive: true, force: true });
    } catch (err) {
      assert.fail('`files_copy` was not removed');
    }
  });
  
  it('`files` exists, `files_copy` does not', async () => {
    // `files` should exist initially
    await fs.access(folder);
    // `files_copy` should not exist initially
    try {
      await fs.access(copyFolder);
      assert.fail('`files_copy` should not exist');
    } catch (err) {
      // Confirm `access` and not `assert.fail` caused the failure
      assert.strictEqual(err.syscall, 'access');
    }
  
    await copy();
    [files, copyFiles] = await Promise.all([
      fs.readdir(folder),
      fs.readdir(copyFolder)
    ]);
  });

  it('Equal number of files and filenames', async () => {
    // Both folders contain the same number of files
    assert.strictEqual(files.length, copyFiles.length);
    // The filenames of the files of both folders are the same
    for (const file of files) {
      copyFiles.some(copyFile => file === copyFile);
    }

  });

  it('Equal contents', async () => {

    // The contents of files of same filenames of both folders are the same
    const [bufferFiles, bufferCopyFiles] = await Promise.all([
      Promise.all(
        files.map(file => fs.readFile(resolve(folder, file)))
      ),
      Promise.all(
        // In order to stay name-synchronized and since we have checked for 
        // name equalitiy, we can map over `files` instead of mapping over `copyFiles`
        files.map(file => fs.readFile(resolve(copyFolder, file)))
      )
    ]);
    for (const [index, buffer] of bufferFiles.entries()) {
      const copyBuffer = bufferCopyFiles[index];
      assert.ok(buffer.equals(copyBuffer));
    }
  });

  it('Failure if folder `files_copy` has already been created', async () => {
    try {
      await copy();
      assert.fail('`copy` must have thrown an error before');
    } catch (err) {
      assert.strictEqual(err.message, 'FS operation failed');
    }
  });

  it('Failure if files folder `files` does not exist', async () => {
    await fs.rm(copyFolder, { recursive: true, force: true });
    let folderTmp = `${dirname(folder)}/tmp`;
    await fs.rename(folder, folderTmp);
    
    try {
      await copy();
      assert.fail('`copy` must have thrown an error before');
    } catch (err) {
      assert.strictEqual(err.message, 'FS operation failed');
    }

    await fs.rename(folderTmp, folder);
  });

});  

