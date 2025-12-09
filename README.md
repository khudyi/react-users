Декомпозиція виконаних задач

1. chore: initial commit

Що зробив:
	•	Створив новий проєкт на React + Vite.
	•	Налаштував базову структуру файлів, щоб можна було далі розробляти функціонал.

2. feat: add initial components and styles for Header, EditUsers, and Users pages

Що зробив:
	•	Створив перші компоненти: Header, EditUsers, Users.
	•	Зробив базову верстку, щоб бачити структуру майбутніх сторінок.
	•	Підключив початкові стилі, щоб компоненти мали приблизний вигляд.

3. feat: implement routing and add EditUsers and Users pages

Що зробив:
	•	Налаштував маршрутизацію (routing), щоб можна було переходити між сторінками.
	•	Підключив сторінки EditUsers та Users до маршрутизатора.

4. feat: add EditUsers page with styling

Що зробив:
	•   Повністю зверстав сторінку EditUsers.
	•	Додав стилі, щоб сторінка мала фінальний вигляд.

5. feat: refactor EditUsers and Users components with new styles and filters

Що зробив:
	•	Зверстав сторінку Users.
	•	Покращив код у компоненті EditUsers, щоб він був акуратніший і зрозуміліший.
	•	Додав оновлені стилі й перші елементи фільтрації.

6. feat: enhance UsersFilter with custom checkbox styling and functionality

Що зробив:
	•	Розробив функцію фільтрації юзерів.
	•	Створив кастомний стиль чекбоксів, щоб вони виглядали сучасніше.
	•	Додав логіку роботи цих чекбоксів.

7. feat: add search functionality to UsersFilter with styling and no results message

Що зробив:
	•	Додав пошук у фільтр юзерів.
	•	Реалізував функцію, коли вибраний фільтр піднімається вище інших.
	•	Додав повідомлення “нічого не знайдено”, якщо пошук не дав результатів.
	•	Покращив стилі.

8. feat: update Users and UsersFilter components with improved styling and filter functionality

Що зробив:
	•	Додав логіку, яка блокує фільтри за країною та статусом, доки в блоці Department не вибрано мінімум 3 опції.
	•	Оновив стилі компонентів Users та UsersFilter, щоб усе виглядало цілісно.

9. feat: implement reset filters and delete user functionality in Users component

Що зробив:
	•	Створив кнопку для очищення всіх фільтрів.
	•	Реалізував можливість видаляти користувача зі списку.

10. feat: implement user update and delete functionality in EditUsers and Users components

Що зробив:
	•	Додав можливість редагувати дані конкретного юзера на сторінці EditUsers.
	•	Зробив так, щоб зміни автоматично відображалися на сторінці Users.
	•	Налаштував повну синхронізацію змін та видалення між обома сторінками.