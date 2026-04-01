export default {
    testEnvironment: "node",
    testMatch: ["**/tests/**/*.test.js"],
    transform: {},
    //extensionsToTreatAsEsm: [".js"],
    testTimeout: 10000,
    detectOpenHandles: true,
    verbose: true,
    testPathIgnorePatterns: ["/node_modules/"]
};