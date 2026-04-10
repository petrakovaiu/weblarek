

// type PostMethods = 'POST' | 'PUT' | 'DELETE';

// export class Api {
//     baseUrl: string;
//     options: RequestInit;

//     constructor(baseUrl: string, options: RequestInit = {}){
//         this.baseUrl = baseUrl;
//         this.options = {
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(options.headers as object ?? {})
//             }
//         };
//     }

//     handleResponse<T>(response: Response): Promise<T> {
//         if (response.ok) return response.json();
//         else return response.json();
//             .then(data => Promise.reject(data.error ?? response.statusText));
//     }

//     get<T extends object>(uri: string) {
//         const response = fetch(`${this.baseUrl}${uri}`, { 
//             ...this.options,
//             method: 'GET'
//         }).then(this.handleResponse<T>);
//         return response;
//     }

//     post<T extends object>(uri: string, data: object, method: PostMethods = 'POST') {
//         const response = fetch(`${this.baseUrl}${uri}`, {
//             ...this.options,
//             method,
//             body: JSON.stringify(data),
//         }).then(this.handleResponse<T>);

//         return response;
//     }
// }


