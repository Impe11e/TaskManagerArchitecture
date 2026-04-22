# Лабораторна робота №1  
## Створення монолітного CRUD застосунку з шаровою архітектурою

**Мета роботи:**  
Навчитися будувати програмний застосунок з використанням шарової архітектури (Layered Architecture) та забезпечувати правильну взаємодію між його компонентами.

## Короткий опис обраної предметної області   
Приклад моделі для → системи управління задачами 
(система що відповідає за створення, перегляд, оновлення, видалення задач):

```
Сутність: Task
Атрибути:
    * id,
    * title,
    * description,
    * status,
    * createdAt,
    * priority,
    * dueDate
    
Сутність: User
Атрибути:
    * id,
    * username,
    * email,
    * passwor,
    
Сутність: Profile
Атрибути:
    * id,
    * userId,
    * bio,
    * avatar,
    * bday,
    * phone

```

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
│   │   └── usersRepo.js
│   ├── models/                  ← Domain models and data structures
│   │   ├── profileModel.js
│   │   ├── taskModel.js
│   │   ├── taskConsts.js        ← Configuration values ​​for tasks (statuses, priorities)
│   │   └── userModel.js
│   ├── errors/                  ← Helpers for error handling
│   │   ├── presentationErrors.js
│   │   └── errorHandler.js
│   └── server/
│       ├── app.ts               ← Express application, route registration
│       ├── server.ts            ← Starting an HTTP server         
│       └── routes/
│           ├── profilesRoutes.js   ← routes /profiles
│           ├── tasksRoutes.js   ← routes /tasks
│           └── usersRoutes.js   ← routes /users
├── package.json
├── vite.config.js
└── README.md
```

## Проста діаграма архітектури
```
                    +----------------------+
                    |        Client        |
                    |  (HTTP Requests)     |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |        Server        |
                    |   Express / HTTP     |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |        Router        |
                    |   /users /tasks ...  |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      Controller      |
                    | request/response     |
                    | validation           |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |        Service       |
                    |    business logic    |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |      Repository      |
                    |   data access layer  |
                    +----------+-----------+
                               |
                               v
                    +----------------------+
                    |        Model         |
                    | domain entities      |
                    | Task / User /Profile |
                    +----------------------+
                               |
                               v
                    +----------------------+
                    |   In-Memory Storage  |
                    |  Map / collections   |
                    +----------------------+
                    
Sidecar modules:
           +----------------------+
           |        Models        |
           |  (Task, User, ...)   |
           +----------------------+

           +----------------------+
           |     Error System     |
           | customErrors         |
           | errorHandler         |
           +----------------------+

```

### Порядок викликів у застосунку:  

**Server → Router → Controller → Service → Repository → Model**  

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

- **App / Server** (`app.ts`, `server.ts`) - відповідають за конфігурацію Express-застосунку та запуск HTTP-сервера.

## Посилання на GitHub репозиторій проекта

**https://github.com/Impe11e/TaskManagerArchitecture**

## Висновки    

У ході виконання лабораторної роботи було розроблено монолітний CRUD-застосунок з використанням шарової архітектури. Було реалізовано REST API, що дозволяє виконувати базові операції над даними: створення, отримання, оновлення та видалення об’єктів.  

У процесі роботи було організовано структуру проєкту відповідно до принципів Layered Architecture, що передбачає розділення відповідальності між різними шарами системи: Controller, Service, Repository та Model. Такий підхід дозволяє зробити код більш структурованим, зрозумілим та зручним для подальшого розширення.  

Також було реалізовано збереження даних у внутрішньому (in-memory) сховищі та протестовано роботу REST-ендпойнтів за допомогою HTTP-запитів.  
