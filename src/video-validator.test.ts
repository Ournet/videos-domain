
import test from 'ava';
import { VideoValidator } from './video-validator';
import { VideoHelper } from './video-helper';

const validator = new VideoValidator()

test('onCreate', t=>{
    const video = VideoHelper.build({
        sourceId: '245252',
        sourceType: 'URL',
        websites: ['one']
    });

    const validatedVideo = validator.onCreate(video);

    t.deepEqual(video, validatedVideo);
})

test('onUpdate', t=>{
    const video = VideoHelper.build({
        sourceId: '245252',
        sourceType: 'URL',
        websites: ['one']
    });

    const validatedVideo = validator.onCreate(video);

    t.deepEqual(video, validatedVideo);
})
