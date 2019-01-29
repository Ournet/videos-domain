
import test from 'ava';
import { VideoHelper } from './video-helper';
import ms = require('ms');
import { VIDEO_MS_LIVETIME } from './config';


test('createId', t => {
    t.true(typeof VideoHelper.createId({ sourceId: '1', sourceType: 'IFRAME' }) === 'string');
})

test('createId normalize url', t => {
    const url1 = VideoHelper.createId({ sourceId: 'https://www.one.one', sourceType: 'IFRAME' });
    const url2 = VideoHelper.createId({ sourceId: 'http://one.one', sourceType: 'IFRAME' });
    const url3 = VideoHelper.createId({ sourceId: 'http://www.one.one', sourceType: 'IFRAME' });
    t.is(url1, url2);
    t.is(url1, url3);
})

test('expiresAt', t => {

    const date = new Date();
    const expiresAt = Math.floor((date.getTime() + ms(VIDEO_MS_LIVETIME)) / 1000);

    t.true(VideoHelper.expiresAt(date) > 0);
    t.true(VideoHelper.expiresAt(date) > date.getTime() / 1000);
    t.is(VideoHelper.expiresAt(date), expiresAt);
})

test('build', t => {
    const video = VideoHelper.build({
        sourceId: 'abaa',
        sourceType: 'IFRAME',
        websites: ['one', 'one'],
    })

    t.is(video.countViews, 0)
    t.is(video.sourceId, 'abaa')
    t.is(video.sourceType, 'IFRAME')
    t.deepEqual(video.websites, ['one'])
})
