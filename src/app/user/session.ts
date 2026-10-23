import { inject, Service } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { CredentialRegister } from '../models/user.model';
import { HttpClient } from '@angular/common/http';

@Service()
export class Session {
    private baseUrl = environment.apiUrl + "/auth";
    private http = inject(HttpClient);

    registerUser(user: CredentialRegister) {
        return this.http.post(`${this.baseUrl}/register`, user);
    }
}
