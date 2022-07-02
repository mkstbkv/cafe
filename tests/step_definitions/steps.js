const { I } = inject();

Given('я нахожусь на странице {string}', (page) => {
    switch (page) {
        case 'Регистрация':
            return I.amOnPage('/register');
        case 'Логин':
            return I.amOnPage('/login');
        case 'Создания заведения':
            return I.amOnPage('/new-place');
        default:
            return I.amOnPage('/');
    }
});

Given('я ввожу в поля формы:', (table) => {
    table.rows.forEach(row => {
        I.fillField(row.cells[0].value, row.cells[1].value);
    });

    I.wait(2);
});



Given('я должен увидеть текст "Вход выполнен"', (table) => {
    I.see('Вход выполнен');
});

Given('добавляю фото', (table) => {
    I.handleDownloads()
});

Given('нажимаю на галочку', (table) => {
    I.seeCheckboxIsChecked('#agree');
});



Given('нажимаю на кнопку формы {string}', (buttonText) => {
    I.click(buttonText, {css: 'form'});
    I.wait(1);
});

Given('вижу в списке заведение', (table) => {
    I.see('test');
});
