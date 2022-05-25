'use strict';

/**
 *  project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project',
    () => ({
        async findOne(args) {
            args.query = { ...args.query, local: "en" };
            const { data, meta } = await super.findOne(args);

            const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
                where: { projects: data.id }
            })

            data.attributes.user = {id: entry.id, name: entry.username}

            return { data };
        },

        async getUserId(data) {
            for(let i in data) {
                const entry = await strapi.db.query('plugin::users-permissions.user').findOne({
                    where: { projects: data[i].id }
                })
                if(entry !== null) {
                    data[i].attributes.user = {id: entry.id, name: entry.username}
                } else {
                    data[i].attributes.user = { }
                }
            }
            return data;
        },

        async find(args) {
            args.query = { ...args.query, local: "en" };
            const { data, meta } = await super.find(args);
            
            let res = await this.getUserId(data);
            return { res };
        }
}));
