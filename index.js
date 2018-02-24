const simpleGit = require('simple-git');
const gitParseUrl = require('git-url-parse');

/**
 * @param {string} cwd Path to root git folder. Default process.pwd
 * @param {string} remote Git remote. Default origin
 * @param {string} ref Git remote ref. Default 'fetch'
 * @returns {Promise}
 */
module.exports = function(cwd, remote, ref) {
    const foundRemote = remote || 'origin';
    const foundRef = ref || 'fetch';

    return new Promise((resolve, reject) => {
        const git = simpleGit(cwd || process.cwd());
        git._silentLogging = true;
        git.getRemotes(true, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const found = data.find(x => x.name === foundRemote);
                if (found) {
                    resolve(gitParseUrl(found.refs[foundRef]));
                } else {
                    reject(new Error('Unknown remote ' + foundRemote));
                }
            }
        });
    });
};
