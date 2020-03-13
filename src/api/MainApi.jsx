import { 
    CREATE_DATA_TO_EXCEL_URL,
    GET_GROUPS_URL,
    UPDATE_GROUPS_URL
} from '../private/config';

class MainApi {
    static async getGroups() {
        const request = new Request(GET_GROUPS_URL, {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
            }),
        });

        try {
            const response = await fetch(request);
            return response.json();
        } catch (error) {
            return error;
        }
    }
    static async updateGroups(id, data) {
        const request = new Request(UPDATE_GROUPS_URL(id), {
            method: 'PUT',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: data
        });

        try {
            const response = await fetch(request);
            return response.json();
        } catch (error) {
            return error;
        }
    }
    static async storeDataExcel(data) {
        const request = new Request(CREATE_DATA_TO_EXCEL_URL, {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: data
        });

        try {
            const response = await fetch(request);
            return response.json();
        } catch (error) {
            return error;
        }
    }
}
export default MainApi;