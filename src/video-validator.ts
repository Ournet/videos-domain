
import { JoiEntityValidator } from "@ournet/domain";
import Joi = require('joi');
import { Video } from "./video";

export class VideoValidator extends JoiEntityValidator<Video> {
    constructor() {
        super({ createSchema, updateSchema });
    }
}

const schema = {
    id: Joi.string().regex(/^[a-z0-9]{32}$/),
    sourceType: Joi.string().valid(['URL', 'YOUTUBE', 'VIMEO', 'IFRAME']),
    sourceId: Joi.string().trim().min(2).max(512),
    width: Joi.number().integer().min(50).max(5000),
    height: Joi.number().integer().min(50).max(5000),
    countViews: Joi.number().integer().min(0),
    websites: Joi.array().items(Joi.string().trim().min(2).max(50)).min(1).unique(),

    createdAt: Joi.string().isoDate(),
    expiresAt: Joi.date().timestamp('unix').raw(),
}

const createSchema = Joi.object().keys({
    id: schema.id.required(),
    sourceType: schema.sourceType.required(),
    sourceId: schema.sourceId.required(),
    width: schema.width,
    height: schema.height,
    countViews: schema.countViews.required(),
    websites: schema.websites.required(),

    createdAt: schema.createdAt.required(),
    expiresAt: schema.expiresAt.required(),
}).required();

const updateSchema = Joi.object().keys({
    id: schema.id.required(),
    set: Joi.object().keys({
        width: schema.width,
        height: schema.height,
        countViews: schema.countViews,
        websites: schema.websites,
        expiresAt: schema.expiresAt,
    }),
    delete: Joi.array().max(0),
}).or('set', 'delete').required();
