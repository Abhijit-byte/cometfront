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
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.6_react-dom@19.2.3_react@19.2.3__react@19.2.3/node_modules/next/server.js [app-route] (ecmascript)");
;
const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov/neo/rest/v1';
async function fetchAsteroidData(query) {
    try {
        if (!NASA_API_KEY) {
            throw new Error('NASA_API_KEY not configured');
        }
        // Check if query is a specific name/number or a general search
        const browseUrl = `${NASA_BASE_URL}/neo/browse?api_key=${NASA_API_KEY}`;
        const browseResponse = await fetch(browseUrl);
        if (!browseResponse.ok) {
            throw new Error(`NASA API error: ${browseResponse.statusText}`);
        }
        const data = await browseResponse.json();
        const neoObjects = data.near_earth_objects || [];
        // Filter results by search query
        const filtered = neoObjects.filter((asteroid)=>asteroid.name?.toLowerCase().includes(query.toLowerCase()) || asteroid.designation?.toLowerCase().includes(query.toLowerCase()));
        return filtered;
    } catch (error) {
        console.error('Error fetching asteroid data:', error);
        return [];
    }
}
function formatAsteroidDetails(asteroids) {
    if (asteroids.length === 0) {
        return 'No asteroids found matching your query. Try searching for specific asteroid names or browse our database.';
    }
    let response = `Found ${asteroids.length} asteroid${asteroids.length !== 1 ? 's' : ''}:\n\n`;
    for(let i = 0; i < Math.min(asteroids.length, 3); i++){
        const ast = asteroids[i];
        const diameterMin = ast.diameter?.estimated_diameter_min?.toFixed(2) || 'N/A';
        const diameterMax = ast.diameter?.estimated_diameter_max?.toFixed(2) || 'N/A';
        const hazardStatus = ast.hazardous ? '⚠️ POTENTIALLY HAZARDOUS' : '✓ Not hazardous';
        const closeApproach = ast.close_approach_data?.[0];
        const velocity = closeApproach?.relative_velocity?.kilometers_per_second || 'N/A';
        const distance = closeApproach?.miss_distance?.kilometers || 'N/A';
        const approachDate = closeApproach?.close_approach_date || 'N/A';
        response += `**${ast.name}** (${ast.designation || 'No designation'})\n`;
        response += `• Status: ${hazardStatus}\n`;
        response += `• Size: ${diameterMin}m - ${diameterMax}m diameter\n`;
        response += `• Absolute Magnitude: ${ast.absolute_magnitude_h?.toFixed(2) || 'N/A'}\n`;
        response += `• Closest Approach Date: ${approachDate}\n`;
        response += `• Velocity: ${velocity} km/s\n`;
        response += `• Miss Distance: ${distance} km\n`;
        response += `• More info: ${ast.url || 'N/A'}\n\n`;
    }
    if (asteroids.length > 3) {
        response += `... and ${asteroids.length - 3} more asteroid${asteroids.length - 3 !== 1 ? 's' : ''} matching your search.`;
    }
    return response;
}
async function POST(request) {
    try {
        const { messages } = await request.json();
        if (!messages || messages.length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'No messages provided'
            }, {
                status: 400
            });
        }
        const lastMessage = messages[messages.length - 1].content;
        // Check for greeting/help questions
        if (lastMessage.toLowerCase().includes('hello') || lastMessage.toLowerCase().includes('hi') || lastMessage.toLowerCase().includes('help')) {
            const response = 'Hello! I\'m your Cosmic Watch assistant. I can help you with:\n\n' + '• Search for specific asteroids (e.g., "Tell me about Apophis")\n' + '• Explain asteroid characteristics (size, velocity, hazard level)\n' + '• Discuss NEO tracking and impact risks\n' + '• Analyze close approaches and distances\n\n' + 'What asteroid would you like to learn about?';
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: response
            });
        }
        // Check if it's asking about largest asteroids
        if (lastMessage.toLowerCase().includes('largest') || lastMessage.toLowerCase().includes('biggest')) {
            try {
                const data = await fetchAsteroidData('');
                const sorted = data.sort((a, b)=>(b.diameter?.estimated_diameter_max || 0) - (a.diameter?.estimated_diameter_max || 0));
                const largest = sorted.slice(0, 3);
                const response = formatAsteroidDetails(largest);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    message: `Here are the largest asteroids in our database:\n\n${response}`
                });
            } catch (error) {
                console.error('Error fetching largest asteroids:', error);
            }
        }
        // Check if it's asking about hazardous asteroids
        if (lastMessage.toLowerCase().includes('hazard') || lastMessage.toLowerCase().includes('risk')) {
            try {
                const data = await fetchAsteroidData('');
                const hazardous = data.filter((ast)=>ast.hazardous);
                const response = formatAsteroidDetails(hazardous.slice(0, 3));
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    message: `Here are potentially hazardous asteroids:\n\n${response}`
                });
            } catch (error) {
                console.error('Error fetching hazardous asteroids:', error);
            }
        }
        // Try to search for specific asteroid name
        const searchQuery = lastMessage.replace(/tell me about/i, '').replace(/search for/i, '').replace(/find/i, '').replace(/show me/i, '').trim();
        if (searchQuery.length > 2) {
            const asteroids = await fetchAsteroidData(searchQuery);
            const response = formatAsteroidDetails(asteroids);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: response
            });
        }
        // Default helpful response
        const response = 'I can help you explore asteroid data! Try asking me:\n' + '• "Tell me about [asteroid name]"\n' + '• "Show the largest asteroids"\n' + '• "What are the hazardous asteroids?"\n' + '• "Search for Apophis"\n\n' + 'Or provide an asteroid name you\'d like to learn more about.';
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: response
        });
    } catch (error) {
        console.error('Chat Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_react$2d$dom$40$19$2e$2$2e$3_react$40$19$2e$2$2e$3_$5f$react$40$19$2e$2$2e$3$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to process message',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__4e4f28f0._.js.map