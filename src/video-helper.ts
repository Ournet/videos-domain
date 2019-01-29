import { md5, uniq, normalizeUrl } from "@ournet/domain";
import { VideoSourceType, VideoBuildData, Video } from "./video";
import ms = require("ms");
import { VIDEO_MS_LIVETIME } from "./config";

export class VideoHelper {
    static createId({ sourceId, sourceType }: { sourceType: VideoSourceType, sourceId: string }) {
        if (/^https?:/.test(sourceId)) {
            sourceId = normalizeUrl(sourceId);
        }
        return md5(`${sourceType.trim()}-${sourceId}`);
    }

    static build(data: VideoBuildData) {
        const id = VideoHelper.createId(data);

        const createdAt = new Date();
        const expiresAt = VideoHelper.expiresAt(createdAt);

        const video: Video = {
            id,
            width: data.width,
            height: data.height,
            sourceId: data.sourceId.trim(),
            sourceType: data.sourceType,
            countViews: 0,
            websites: uniq(data.websites),
            createdAt: createdAt.toISOString(),
            expiresAt,
        };

        return video;
    }

    static expiresAt(refDate: Date) {
        const time = refDate.getTime() + ms(VIDEO_MS_LIVETIME);

        return Math.floor(time / 1000);
    }
}
