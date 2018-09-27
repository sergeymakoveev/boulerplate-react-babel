export const createSyncAction = (type) => (payload) => ({ type, ...payload });
