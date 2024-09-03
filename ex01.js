import { requestLogin } from "./http.js";

const root = document.querySelector(".root");

const render = () => {
  // nếu có token thì sẽ hiển thị profile
  // trường hợp không phải là application JSON
  if (localStorage.getItem("user_token")) {
    root.innerHTML = `<div class="profile">
    <h2>Chào mừng bạn đã quay trở lại</h2>
    <ul class="list-unstyled">
      <li>Chào bạn : Phan Hiệp</li>
      <li><a href="$">Đăng xuất</a></li>
    </ul>
  </div>`;

    return;
  }
  root.innerHTML = `
    <h2>Đăng nhập</h2>
      <form action="" class="login">
      <div class="msg"></div>
        <div class="mb-3">
          <label for="">Email</label>
          <input
            type="email"
            name="email"
            class="form-control"
            placeholder="Email"
          />
        </div>
        <div class="mb-3">
          <label for="">Mật khẩu</label>
          <input
            type="password"
            name="password"
            class="form-control"
            placeholder="password"
          />
        </div>
        <div class="d-gird">
          <button class="btn btn-primary" >  Đăng nhập</button>
        </div>
      </form>
    `;
};
const handleLoginForm = () => {
  root.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("login")) {
      const msgEl = e.target.querySelector(".msg");
      msgEl.innerText = ``;
      const dataLogin = Object.fromEntries(new FormData(e.target));
      //   loading
      const btn = e.target.querySelector("button");
      btn.disabled = true;
      console.log(btn);
      btn.innerHTML = ` <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Loading... `;
      const response = await requestLogin(dataLogin);
      // nếu api xong bỏ loading
      btn.disabled = false;
      btn.innerText = `Đăng nhập`;
      if (!response) {
        msgEl.innerHTML = `<div class="alert alert-danger text-center">Email hoặc mật khẩu không chính xác</div>`;
      } else {
        // lưu token vào bộ nhớ trình duyệt
        // chuyển object thành JSON, lưu vào local
        localStorage.setItem("user_token", JSON.stringify(response));
        e.target.reset();

        // render
        render();
      }
    }
  });
};
handleLoginForm();
render();
