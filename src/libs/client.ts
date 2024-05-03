import axios from "axios";

interface requestInterface {
    baseUrl: string,
    method?: string
}

const requestApi = async ({ baseUrl, method = 'get' }: requestInterface) => {

    try {
        const response = await axios.request({ url: baseUrl, method });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const requestApiGraphQl = async (query: string) => {
    try {
        const graphqlMutation = {
            query
        };
        const response = await axios.post("http://localhost:3000/graphql", graphqlMutation);

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export { requestApi, requestApiGraphQl };
