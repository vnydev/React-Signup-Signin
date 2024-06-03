import axios, {AxiosResponse} from 'axios'
export const baseUrl = 'http://localhost:9000'

export const httpPost = async (path: string, data: any): Promise<AxiosResponse> => {
    const url = baseUrl + path
    return await axios.post(url, data)
}


