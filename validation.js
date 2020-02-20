const url = 'https://digital-spectr.com/ac/academy.php';
const submitForm = () => {
    $('#form').submit((event) => {
        event.preventDefault();
        axios.post(url, {
            'name': 'дима',
            'phone': '7292932',
            'email': 'dima@mail.ru',
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error)
        });
        console.log('ahhah')
    });
};

submitForm();
