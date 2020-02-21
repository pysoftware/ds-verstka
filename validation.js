const url = 'https://digital-spectr.com/ac/academy.php';
let messages = [];
const validation = {
    set(target, prop, value) {
        if (prop === 'email' && /\S+@\S+\.\S+/.test(value)) {
            target[prop] = value;
            return;
        }
        if (prop === 'name' && /[а-яА-Я]+|-|\\/.test(value)) {
            target[prop] = value;
            return;
        }
        if (prop === 'number' && /[0-9]{3}|\\|-|\\+/.test(value)) {
            target[prop] = value;
            return;
        }
        messages.push(`Invalid value of ${prop} field`);
    }
};
const form = {};
const formProxy = new Proxy(form, validation);

const validateEmail = (value) => formProxy.email = value;
const validateName = (value) => formProxy.name = value;
const validatePhone = (value) => formProxy.number = value;

$('#form').submit(function (event) {
    event.preventDefault();
    $(this).serializeArray().forEach(element => {
        if (element.value.trim() === '') {
            if (element.name !== 'email') {
                messages.push(`${element.name} is required field`)
            }
        }
    });
    if (messages.length > 0) {
        $('#errors').text(messages.join(', '));
        messages = [];
    } else {
        $('#errors').text('');
        console.log(form);
        axios.post(url, form)
            .then(function (response) {
                console.log(response);
            }).catch(function (error) {
            console.log(error)
        });
    }

});

