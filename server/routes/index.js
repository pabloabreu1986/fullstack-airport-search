'use-strict';

const express = require('express');
const app = express();
const { request } = require('graphql-request');
const {
    filter,
    some
} = require('lodash');

const endpoint = process.env.EXTERNAL_API;
const sdlQuery = `{airports {name, seoName, iataCode, routes}}`;

app.get('/autocomplete', async (req, res, next) => {
    const searchTerm = req.query.query.toLowerCase();
    const iataCode = req.query.departure && req.query.departure.toUpperCase();

    if (searchTerm.length <= 2) {
        return res.status(400).send({
            error: 'Search term has to be a length of two or more'
        });
    }

    const {airports} = await request(endpoint, sdlQuery);

    const filteredAirports = filter(airports, airport => {
        // filtering by departure routes
        if (iataCode) {
            if (!some(airport.routes, route => {
                    const parts = route.split(':');
                    if (parts.length < 2) return false;
                    if (parts[0] !== 'airport') return false;
                    if (parts[1] !== iataCode) return false;
                    return true;
                })) {
                return false;
            }
        }
        // filtering by search term
        const nameL = airport.name.toLowerCase();
        const seoNameL = (airport.seoName || "").toLowerCase();
        const iataCodeL = airport.iataCode.toLowerCase();
        // search term is present always
        return nameL.includes(searchTerm) || seoNameL.includes(searchTerm) || iataCodeL.includes(searchTerm);
    });

    return res.json(filteredAirports)
});

module.exports = app;