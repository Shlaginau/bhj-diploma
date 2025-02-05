/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const сurrentUser = User.current();
    const accountsSelect = this.element.querySelector('.accounts-select');

    if (сurrentUser) {
      Account.list(сurrentUser, (err, response) => {
        if (response && response.success) {
          accountsSelect.innerHTML = '';
          response.data.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = account.name;
            accountsSelect.appendChild(option);
          });
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    const modalId = this.element.closest('.modal').dataset.modalId;

    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        this.element.reset(); 
        App.getModal(modalId).close(); 
        App.update();
      }
    });
  }
}