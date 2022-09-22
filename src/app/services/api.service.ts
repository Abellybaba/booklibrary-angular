import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postBook(data : any){
    return this.http.post<any>("https://my-json-server.typicode.com/abellybaba/json-api/libraryList/",data);
  }
getBook(){
  return this.http.get<any>("https://my-json-server.typicode.com/abellybaba/json-api/libraryList/");
}
putBook(data:any,id:number){
  return this.http.put<any>("https://my-json-server.typicode.com/abellybaba/json-api/libraryList/"+id , data);
}
deleteBook(id:number){
  return this.http.delete<any>("https://my-json-server.typicode.com/abellybaba/json-api/libraryList/"+id);
}
}
