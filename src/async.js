// Functions relating to async workflows

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));
