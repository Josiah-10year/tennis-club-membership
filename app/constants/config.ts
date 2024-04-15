const ACTUAL_STORE_OPENING_TIME = 9 //hours
const ACTUAL_STORE_CLOSING_TIME = 17 //hours


// Function to convert Atlantic Time (AST) to UTC time
function convertAstToUtc(astHours: number): number {
    // Add 4 hours for UTC
    return (astHours + 4) % 24;
}

export const STORE_OPENING_TIME = convertAstToUtc(ACTUAL_STORE_OPENING_TIME)
export const STORE_CLOSING_TIME = convertAstToUtc(ACTUAL_STORE_CLOSING_TIME)
export const INTERVAL = 60 //minutes
