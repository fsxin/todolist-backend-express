import * as crypto from 'crypto';

function md5(s: any) {
    return crypto.createHash('md5').update('' + s).digest('hex');
}

export default md5;