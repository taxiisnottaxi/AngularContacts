import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit {

  signinForm = {
    email: '',
    password: ''
  }

  email_err_msg = ''
  err_message = ''

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
  }

  signin () {

    this.http.post('http://localhost:3000/session', this.signinForm)
      .toPromise()
      .then((data: any) => {
        console.log(1)
        console.log(this.signinForm)
        window.localStorage.setItem('auth_token', data.token)
        window.localStorage.setItem('user_info', JSON.stringify(data.user))
        console.log(data)
        this.router.navigate(['/'])
      })
      .catch(err => {
        if (err.status === 401) {
          this.err_message = '登陆失败，邮箱或密码错误！'
        }
      })
  }
}
