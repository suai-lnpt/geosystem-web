import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token = null;
    public authenticated = signal(this.getToken() !== null);

    constructor(private http: HttpClient){
    }

    register(userValue): Observable<{token: string}> {
        return this.http.post<any>("/api/auth/register", userValue);
    }

    login(userValue): Observable<{token: string}> {
        return this.http.post<{token: string}>("/api/auth/login", userValue)
        .pipe(
            tap(
                ({token}) => {
                    localStorage.setItem('auth-token', token);
                    this.setToken(token);
                }
            )
        );
    }

    getUser(){
        let params = new HttpParams();
        params = params.append("token", this.token);
        return this.http.get("/api/auth/getUser", {params: params});
    }

    setToken(token: string){
        this.token = token;
        this.authenticated.set(this.getToken() !== null);
    }

    getToken(): string {
        return this.token;
    }

    isAuthenticated(): boolean{
        return !!this.token;
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }

    isInnCorrect = (inn: string) => {
        // Если inn не содержит строку то сразу вернуть false
        if (typeof inn !== 'string') return false
      
        // Если 10-значный ИНН
        if (inn.match(/^\d{10}$/)) {
          // Вычислить сумму произведений цифр ИНН (с 1-й по 9-ю) на следующие коэффициенты — 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 2 * ИНН[1] + 4 * ИНН[2] + ...).
          const sum = [2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)
      
          // Вычислить остаток от деления полученной суммы на 11.
          // Сравнить младший разряд полученного остатка от деления с младшим разрядом ИНН. Если они равны, то ИНН верный.
          return (sum % 11) % 10 === Number(inn[9])
        }
      
        // Если 12-значный ИНН
        if (inn.match(/^\d{12}$/)) {
          // Вычислить 1-ю контрольную цифру:
          // Вычислить сумму произведений цифр ИНН (с 1-й по 10-ю) на следующие коэффициенты — 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 7 * ИНН[1] + 2 * ИНН[2] + ...).
          const sum1 = [7, 2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)
      
          // Вычислить 2-ю контрольную цифру:
          // Вычислить сумму произведений цифр ИНН (с 1-й по 11-ю) на следующие коэффициенты — 3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8 (т.е. 3 * ИНН[1] + 7 * ИНН[2] + ...).
          const sum2 = [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8].reduce((sum, current, i) => sum + current * Number(inn[i]), 0)
      
          // Вычислить младший разряд остатка от деления полученных сумм на 11.
          // Сравнить 1-ю контрольную цифру с 11-й цифрой ИНН и сравнить 2-ю контрольную цифру с 12-й цифрой ИНН. Если они равны, то ИНН верный.
          return (sum1 % 11) % 10 === Number(inn[10]) && (sum2 % 11) % 10 === Number(inn[11])
        }
      
        // Во всех остальных ИНН некорректный 
        return false
      }
}