import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user = JSON.parse(window.localStorage.getItem('user_info') || '{}')
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signout(e){
    // 去除默认请求事件
    e.preventDefault()
    this.http.delete('http://localhost:3000/session')
      .toPromise()
      .then((data: any) => {
        window.localStorage.removeItem('auth_token')
        this.router.navigate(['/signin'])
      })
      .catch(err => {
        window.alert('退出失败，请稍后重试！')
      })
  }

}
