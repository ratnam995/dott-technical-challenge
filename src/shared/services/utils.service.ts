import iConfig from "../models/PaginationConfig.model";

export const isAllImagesFetched = (config: iConfig, fullList: Array<string>) => {
    const startIndex = config.page * config.limit;

    return startIndex >= fullList.length;
};
