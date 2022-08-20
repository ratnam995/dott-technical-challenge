import iDogsAPIResponse from "../../models/DogsAPIResponse.model";
import iConfig from "../../models/PaginationConfig.model";

const Dogs = {
    getAll: (breed: string, subBreed:string): Promise<iDogsAPIResponse> => {
        return fetch(`https://dog.ceo/api/breed/${breed}${subBreed? `/${subBreed}` : '' }/images`)
        .then(response => response.json());
    },
    getSome : (config: iConfig, fullList: Array<string>): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const startIndex = config.page * config.limit;
                const endIndex = startIndex + config.limit;
                return resolve([...fullList.slice(startIndex, endIndex)])
            }, 1000);
        });
    }
}

export default Dogs;