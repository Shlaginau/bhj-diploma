/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {

    const sideBar = document.querySelector('.sidebar-mini');
    const sideBarButton = document.querySelector('.sidebar-toggle');
    let activeSideBar = null;
 
    sideBarButton.addEventListener('click', (e) => {
      e.preventDefault();

      sideBar.classList.toggle('sidebar-open');
      sideBar.classList.toggle('sidebar-collapse');
  })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const login = document.querySelector('.menu-item_login');
    const register = document.querySelector('.menu-item_register');
    const logout = document.querySelector('.menu-item_logout');

    register.addEventListener('click', () => {
      App.getModal('register').open();
    });

    login.addEventListener('click', () => {
      App.getModal('login').open();
    });

    logout.addEventListener('click', () => {
      User.logout((err, response) => {
        if (response && response.success) {
          App.setState('init');
        }
      });
    });
  }
}
