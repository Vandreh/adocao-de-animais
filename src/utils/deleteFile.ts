import * as fs from 'node:fs';

export const deleteFile = async (filename: string) => {
    const path = require('path');
    const local = path.resolve(filename);
    fs.unlink(local, () => {});
}