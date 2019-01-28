
export type VideoSourceType = 'URL' | 'YOUTUBE' | 'VIMEO' | 'IFRAME';

export interface Video {
    id: string
    sourceType: VideoSourceType
    sourceId: string
    width?: number
    height?: number
    countViews: number
    websites: string[]
    createdAt: string
    expiresAt: number
}

export interface VideoBuildData {
    sourceType: VideoSourceType
    sourceId: string
    width?: number
    height?: number
    websites: string[]
}
