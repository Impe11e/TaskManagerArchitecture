# Лабораторна робота №1  
## Створення монолітного CRUD застосунку з шаровою архітектурою

**Мета роботи:**  
Навчитися будувати програмний застосунок з використанням шарової архітектури (Layered Architecture) та забезпечувати правильну взаємодію між його компонентами.

## Короткий опис обраної предметної області   



## Структура проєкту

```
task_manager/
├── src/
│   ├── controllers/             ← HTTP request handling layer
│   │   ├── profileController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── services/                ← Business logic services
│   │   ├── profileService.js
│   │   ├── taskService.js
│   │   └── userService.js
│   ├── repositories/            ← Repositories for data access
│   │   ├── profileRepository.js
│   │   ├── taskRepository.js
│   │   └── userRepo.js
│   ├── models/                  ← Domain models and data structures
│   │   ├── profileModel.js
│   │   ├── taskModel.js
│   │   ├── taskConsts.js        ← Configuration values ​​for tasks (statuses, priorities)
│   │   └── userModel.js
│   └── server/
│       ├── app.js               ← Express application, route registration
│       ├── server.js            ← Starting an HTTP server         
│       ├── middleware/
│       └── routes/
│           ├── profilesRoutes.js   ← routes /profiles
│           ├── tasksRoutes.js   ← routes /tasks
│           └── usersRoutes.js   ← routes /users
├── package.json
├── vite.config.js
└── README.md
```

## Проста діаграма архітектури

### Порядок викликів у застосунку:  

**Controller → Service → Repository**  

Модуль **Model** у даній архітектурі виступає як *sidecar* - спільний модуль, який не належить безпосередньо до шарів Controller, Service або Repository, але може використовуватися кожним із них.

### Архітектурні обмеження

Для забезпечення правильної структури застосунку були дотримані такі правила:

- **Controller не має прямого доступу до Repository або бази даних, також не містить бізнес-логіки**, а лише обробляє HTTP-запити та формує відповіді. Взаємодіє лише з Service.

- **Service не залежить від Controller**, а виконує лише бізнес-логіку застосунку. Він взаємодіє лише з Repository для доступу до даних.  

- **Repository відповідає виключно за роботу з даними.**

## Короткий опис реалізованих компонентів

- **Controllers** (`profileController.js`, `taskController.js`, `userController.js`) - приймають HTTP-запити від клієнта, викликають відповідні методи сервісного шару та повертають HTTP-відповідь.

- **Services** (`profileService.js`, `taskService.js`, `userService.js`) - реалізують бізнес-логіку застосунку та викликають відповідні методи репозиторіїв.

- **Repositories** (`profileRepository.js`, `taskRepository.js`, `userRepository.js`) - забезпечують доступ до даних та виконують CRUD-операції з використанням in-memory сховища (потім - у БД).

- **Models** (`profileModel.js`, `taskModel.js`, `userModel.js`) - описують структуру сутностей системи (Task та User) та їхні основні поля.

- **Middleware** - проміжні обробники запитів (наприклад, парсинг JSON, обробка помилок).

- **Routes** (`profileRoutes.js`, `tasksRoutes.js`, `usersRoutes.js`) - визначають REST-маршрути застосунку та пов’язують HTTP-запити з відповідними методами контролерів.

- **App / Server** (`app.js`, `server.js`) - відповідають за конфігурацію Express-застосунку та запуск HTTP-сервера.

## Посилання на GitHub репозиторій проекта

**https://github.com/Impe11e/TaskManagerArchitecture**

## Висновки    

У ході виконання лабораторної роботи було розроблено монолітний CRUD-застосунок з використанням шарової архітектури. Було реалізовано REST API, що дозволяє виконувати базові операції над даними: створення, отримання, оновлення та видалення об’єктів.  

У процесі роботи було організовано структуру проєкту відповідно до принципів Layered Architecture, що передбачає розділення відповідальності між різними шарами системи: Controller, Service, Repository та Model. Такий підхід дозволяє зробити код більш структурованим, зрозумілим та зручним для подальшого розширення.  

Також було реалізовано збереження даних у внутрішньому (in-memory) сховищі та протестовано роботу REST-ендпойнтів за допомогою HTTP-запитів.  
