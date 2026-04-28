// export default {
//     testEnvironment: "node",
//     testMatch: ["**/tests/**/*.test.js"],
//     transform: {},
//     //extensionsToTreatAsEsm: [".js"],
//     testTimeout: 10000,
//     detectOpenHandles: true,
//     verbose: true,
//     testPathIgnorePatterns: ["/node_modules/"]
// };
/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.[jt]s"],
    preset: 'ts-jest/presets/default-esm', 
    extensionsToTreatAsEsm: [".ts"],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    testTimeout: 10000,
    detectOpenHandles: true,
    verbose: true,
    testPathIgnorePatterns: ["/node_modules/"]
};