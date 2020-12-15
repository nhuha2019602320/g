import InputWrapper from "./InputWrapper.js";
import {validateEmail} from "../utils.js";
const $template = document.createElement('template');
$template.innerHTML = /*html*/ `
    <link rel="stylesheet" href="../../css/register-form.css">
    <form id="register-form">
        <h2>Đăng kí tài khoản</h2>
        <input-wrapper id="email" label="Email" type="email" error="" value=""></input-wrapper>
        <input-wrapper id="name" label="Tên đăng kí" type="text" error="" value=""></input-wrapper>
        <input-wrapper id="password" label="Mật khẩu" type="password" error="" value=""></input-wrapper>
        <input-wrapper id="password-confirmation" label="Xác nhận mật khẩu" type="password" error="" value=""></input-wrapper>
        <button id="register-btn">Đăng kí</button>

        <div id="to-login">
            Bạn đã có tài khoản? <b><a href="#">Đăng nhập</a></b>
        </div>
    </form>
`;

export default class RegisterForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild($template.content.cloneNode(true));
        this.$form = this.shadowRoot.getElementById('register-form');

        this.$email = this.shadowRoot.getElementById('email');
        this.$name = this.shadowRoot.getElementById('name');
        this.$password = this.shadowRoot.getElementById('password');
        this.$passwordConfirmation = this.shadowRoot.getElementById('password-confirmation');
    }

    connectedCallback() {
        this.$form.onsubmit = (event) => {
            event.preventDefault();
            let email = this.$email.value();
            let name = this.$name.value();
            let password = this.$password.value();
            let $passwordConfirmation = this.$passwordConfirmation.value();
            
            // if(email == '') {
            //     this.$email.error("Nhập vào email");
            // } else {
            //     this.$email.error("")
            // }

            let isPassed =
            InputWrapper.validate(this.$email, (value) => {
                return value != '';
            } ,"Nhập vào email") && InputWrapper.validate(this.$email, (value) => validateEmail(value) , "Định dạng email không chính xác") &

            InputWrapper.validate(this.$name, (value) => {
                return value != '';
            }, "Nhập vào tên đăng kí")&

            InputWrapper.validate(this.$password, (value) => {
                return value != '';
            }, "Nhập vào mật khẩu")

            InputWrapper.validate(this.$passwordConfirmation, (value) => {
                return value != ''
            }, "Nhập lại mật khẩu" )
             
            if(isPassed) {
                
            }
            // InputWrapper(this.$email, (value) => validateEmail(value) , "Định dạng email không chính xác");
        }
    }
}

window.customElements.define('register-form', RegisterForm);