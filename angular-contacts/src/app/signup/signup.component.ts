import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm = {
    email: '',
    password: ''
  }

  email_err_msg = ''

  // 在组件类中声明了一个私有成员 http（由于不需要外部访问，所以直接声明成这样就好了）
  // 它的类型是 HttpClient，那么 Angular 会自动实例化，得到一个实例
  // 然后我们就可以在组件中使用 http 这个成员来调用一些请求方法了
  // 例如 http.get http.post...
  constructor(
    private http: HttpClient,
    private router: Router
    ) {
    
  }

  ngOnInit(): void {
  }

  signup () {
    // console.log('表单提交了！')
    // 1.表单认证，已经在前端完成了，只要认证不成功就无法点击按钮
    // 2.获取表单数据
    // 3.发起 http 请求和服务端交互
    // 4.根据响应结果做交互处理
    const formData = this.signupForm
    this.http.post('http://localhost:3000/users', formData).toPromise().then((data:any) => {
      this.email_err_msg = ''
      window.localStorage.setItem('auth_token', data.token)
      this.router.navigate(['/'])
    }).catch(err => {
      if(err.status === 409){
        this.email_err_msg = '邮箱已被占用！'
      }
    })
  }
}
