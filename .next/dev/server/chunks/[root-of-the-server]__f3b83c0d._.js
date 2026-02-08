module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/asteroids/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
;
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const days = searchParams.get('days') || '7';
        if (!NASA_API_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'NASA_API_KEY not configured'
            }, {
                status: 500
            });
        }
        // Get today's date and calculate start/end dates
        const today = new Date();
        const startDate = today.toISOString().split('T')[0];
        const endDate = new Date(today.getTime() + parseInt(days) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        // Fetch feed data with date range
        const feedUrl = `${NASA_BASE_URL}/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;
        const feedResponse = await fetch(feedUrl);
        if (!feedResponse.ok) {
            throw new Error(`NASA API error: ${feedResponse.statusText}`);
        }
        const data = await feedResponse.json();
        // Process and enhance data - collect all unique asteroids
        const asteroidsMap = new Map();
        const neoFeed = data.near_earth_objects || {};
        for(const date in neoFeed){
            const dayAsteroids = neoFeed[date] || [];
            for (const asteroid of dayAsteroids){
                const asteroidId = asteroid.id;
                // If we haven't seen this asteroid, add it
                if (!asteroidsMap.has(asteroidId)) {
                    // Get the closest approach from all close approach data
                    let closeApproachData = asteroid.close_approach_data?.[0];
                    let closestDistance = parseFloat(closeApproachData?.miss_distance?.kilometers) || Infinity;
                    for (const approach of asteroid.close_approach_data || []){
                        const distance = parseFloat(approach.miss_distance?.kilometers) || Infinity;
                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closeApproachData = approach;
                        }
                    }
                    asteroidsMap.set(asteroidId, {
                        id: asteroid.id,
                        name: asteroid.name,
                        diameter: asteroid.estimated_diameter?.meters,
                        velocity: closeApproachData?.relative_velocity?.kilometers_per_second,
                        distance: closeApproachData?.miss_distance?.kilometers,
                        date: closeApproachData?.close_approach_date,
                        hazardous: asteroid.is_potentially_hazardous_asteroid,
                        url: asteroid.nasa_jpl_url,
                        absoluteMagnitude: asteroid.absolute_magnitude_h,
                        orbitalData: asteroid.orbital_data
                    });
                }
            }
        }
        // Convert to array and sort by distance
        const asteroids = Array.from(asteroidsMap.values());
        asteroids.sort((a, b)=>(parseFloat(a.distance) || Infinity) - (parseFloat(b.distance) || Infinity));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            count: asteroids.length,
            asteroids: asteroids,
            totalAsteroids: data.element_count || asteroids.length,
            date: new Date().toISOString(),
            dateRange: {
                startDate,
                endDate
            }
        });
    } catch (error) {
        console.error('[v0] API Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to fetch asteroid data',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f3b83c0d._.js.map