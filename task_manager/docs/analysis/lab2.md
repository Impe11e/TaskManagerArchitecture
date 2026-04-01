# Лабораторна робота №2  
## Шарова архітектура та доменна модель

**Мета роботи:**  
Відділити бізнес-логіку від інфраструктури. Студенти рефакторять код із лабораторної 1, щоб на
практиці побачити різницю між «все в купі» та структурованим підходом.


## Посилання на GitHub репозиторій проекта

**https://github.com/Impe11e/TaskManagerArchitecture**


## Еволюція структури: від Лаб 1 до Лаб 2

### Структура Лаб 1 (проста 3-шарова архітектура)

```
src/
├── controllers/          ← Обробка запитів
│   ├── taskController.js
│   └── userController.js
├── services/            ← Бізнес-логіка
│   ├── taskService.js
│   └── userService.js
├── repositories/        ← Доступ до БД
│   ├── taskRepository.js
│   └── usersRepo.js
├── models/              ← Моделі БД
│   ├── taskModel.js
│   └── userModel.js
└── routes/
    ├── tasksRoutes.js
    └── usersRoutes.js
```

**Проблеми Лаб 1:**
- Controllers змішують HTTP-логіку з бізнес-логікою
- Бізнес-правила розкидані по Services
- Моделі залежать від БД (не чистої доменної моделі)
- Важко тестувати бізнес-логіку без БД

### Структура Лаб 2 (Clean Architecture з 4 шарами)

```
src/
├── presentation/        ← Все про HTTP
│   ├── tasks/
│   │   ├── controllers/taskController.js
│   │   ├── dto/*.js                       ← DTO для запиту
│   │   └── routes/tasksRoutes.js
│   └── users/
│       ├── controller/usersController.js
│       ├── requestDto/*.js               ← DTO для запиту
│       └── routes/usersRoutes.js
├── application/         ← Оркеструвння бізнес-операцій (НОВЕ)
│   ├── tasks/
│   │   └── useCases/*.js                ← Один сценарій = один файл
│   └── users/
│       └── useCases/*.js
├── domain/              ← Чиста бізнес-логіка (НОВОЕ)
│   ├── tasks/
│   │   ├── entities/taskEntity.js        ← **Rich Domain Model**
│   │   ├── factories/taskFactory.js      ← Створення Entity
│   │   ├── services/taskDomainService.js ← Бізнес-правила
│   │   └── repoInterfaces/               ← Контракт з БД
│   └── users/
│       ├── entity/userEntity.js
│       ├── service/usersDomainService.js
│       └── repoInterfaces/
└── infrastructure/      ← Технічні деталі (рефакторено)
    ├── tasks/
    │   ├── repositories/taskRepository.js
    │   ├── models/taskModel.js
    │   └── mappers/taskMapper.js        ← Маппер Entity ↔ БД
    └── users/
        ├── repository/usersRepo.js
        └── mapper/usersMapper.js
```


### Ключові зміни

#### 1. Додано Application Layer
- Кожна бізнес-операція (Use Case) — окремий файл
- `CreateTaskUseCase`, `UpdateTaskUseCase` тощо
- Оркеструє Domain Logic та Repository

#### 2. Додано Domain Layer
- **Entity** з фактичною бізнес-логікою (Rich Domain Model)
- **DomainService** для складних бізнес-правил
- **Repository Interface** — контракт, не реалізація
- Повністю незалежно від технічних деталей

#### 3. Додано DTOs та Mappers
- `createTaskDTO.js` — валідація вхідних даних
- `taskMapper.js` — трансформація Domain Entity ↔ БД модель
- Вихідні дані мапляться в response DTO

#### 4. Функціка Presentation Layer
- Controllers тільки для HTTP (не містять бізнес-логіку)
- Routes делегують до Controllers

#### 5. Переозначення Infrastructure
- Тільки реалізація Repository (конкретна БД)
- Моделі БД відділені від Domain Models
- Маппери для трансформації даних

### Порівняння потоку даних

#### Лаб 1:
```
HTTP Request 
    → Controller (змішує HTTP + бізнес)
    → Service (змішує бізнес + БД деталі)
    → Repository (БД запит)
    → Модель (залежить від БД)
    → Response
```

#### Лаб 2:
```
HTTP Request 
    → Route (маршрут)
    → Controller (тільки парсинг запиту)
    → DTO (валідація)
    → UseCase (оркеструвння)
    → DomainService (бізнес-правила)
    → Entity (чистий домен)
    → Repository Interface
    → RepositoryImpl (конкретна БД)
    → Mapper (трансформація в Entity)
    → Response DTO
    → HTTP Response
```


## Переваги розділення на архітектурні шари

### 1. Розділення відповідальності
Кожен шар відповідає за одну функцію: Presentation обробляє запити, Application керує логікою, Domain утримує бізнес-правила, Infrastructure реалізує зберігання. Це відповідає принципу SRP та спрощує розуміння коду.

### 2. Покращена тестованість
Domain та Application логіка тестуються ізольовано без залежностей від БД. Використання mock-репозиторіїв прискорює виконання тестів. Проект має 28 unit-тестів з 100% покриттям критичної логіки.

### 3. Незалежність від технологій
Бізнес-логіка не залежить від Express, PostgreSQL або інших бібліотек. Заміна фреймворку чи БД вимагає змін тільки в одному шарі, без торкання core бізнес-рулз.

### 4. Простота розширення
Нові сценарії (use cases) додаються в ізольовану папку без впливу на існуючий код. Чітка структура дозволяє швидко орієнтуватися й добавляти функціональність.

### 5. Командна робота
Різні члени команди можуть працювати паралельно на різних рівнях архітектури без конфліктів.

## Недоліки та ускладнення

### 1. Збільшення обсягу коду
Шарова архітектура вимагає створення додаткових структур: DTOs, Mappers, UseCase класів та інтерфейсів репозиторіїв. Це збільшує загальний обсяг коду та час розробки.

### 2. Складний мепінг між шарами
Трансформація даних між шарами вимагає Mapper-ів й DTO-ів, що додає бойлерплейт коду. Одна операція може потребувати: Entity → DTO → Request → Domain Entity → DTO → Response, що робить тривіальні завдання складнішими.

### 3. Складніша навігація в коді
Для розуміння однієї бізнес-операції потрібно переходити між 5+ файлами в різних папках (Route → Controller → UseCase → Service → Repository). Це затруднює навчання для новачків.

### 4. Складність планування архітектури
Виділення відповідальності потребує передбачення структури з самого початку. Неправильне розділення шарів потім важко перероблюється й вимагає переписування значної частини коду.


## Практичний приклад: заміна БД або фреймворку

### Заміна базі даних (PostgreSQL → MongoDB)

Без архітектури: потрібно переписати **весь проект**. Запити, моделі, контролери — все змішано.

З архітектурою в цьому проекті: потрібно змінити тільки **Infrastructure Layer**:

```
src/infrastructure/
├── tasks/
│   ├── repositories/taskRepository.js  ← ТІЛЬКИ ЦЕ
│   ├── models/taskModel.js             ← ТІЛЬКИ ЦЕ
│   └── mappers/taskMapper.js           ← МОЖЛИВО, ЦЕ
└── users/
    ├── repository/usersRepo.js         ← ТІЛЬКИ ЦЕ
    └── mapper/usersMapper.js           ← МОЖЛИВО, ЦЕ
```

**Все інше без змін:**
- Application Layer (UseCase-и) — використовує той же інтерфейс репозиторіїв
- Domain Layer (Entities) — не знає про БД взагалі
- Presentation Layer (Routes) — отримує ті ж результати

### Заміна фреймворку (Express → Fastify)

Потрібно змінити тільки **Presentation Layer**:

```
src/presentation/
├── tasks/
│   ├── controllers/taskController.js    ← БЕЗ ЦЬОГО
│   ├── dto/                              ← БЕЗ ЦЬОГО
│   └── routes/tasksRoutes.js            ← ТІЛЬКИ ЦЕ
└── users/
    ├── controller/usersController.js    ← БЕЗ ЦЬОГО
    ├── requestDto/                       ← БЕЗ ЦЬОГО
    └── routes/usersRoutes.js            ← ТІЛЬКИ ЦЕ
```

**Все інше абсолютно не чіпається:**
- Application/Domain/Infrastructure — жодних змін
- Бізнес-логіка така сама
- Тести не ломаються


## Чому обрано Rich Domain Model?

У проекті реалізовано **Rich Domain Model**, де Entities містять не тільки дані, а й бізнес-логіку.

**Rich Domain Model** в цьому проекті:

```javascript
// UserEntity утримує валідацію та бізнес-правила
class UserEntity {
    constructor(id, username, email, password) {
        // Валідація в конструкторі
        UserEntity._validateUsername(username);
        UserEntity._validateEmail(email);
        this.username = username;
        this.email = email;
    }

    // Методи, що змінюють стан з розуміння бізнес-правил
    update({username, email, password}) {
        if (username !== undefined) {
            UserEntity._validateUsername(username);
            this.username = username;
        }
    }
}
```

```javascript
// TaskEntity містить бізнес-логіку про задачі
class TaskEntity {
    isOverdue() {
        return this.dueDate < new Date() && this.status !== DONE;
    }

    isUrgent() {
        return this.priority === HIGH && this.status !== DONE;
    }

    complete() {
        this.status = TASK_STATUS.DONE;
    }
}
```

### Причини вибору Rich Domain Model

#### 1. Захист інваріантів
Бізнес-правила реалізовані у Entity, що гарантує їх дотримання. Неможливо створити недійсний об'єкт:

```javascript
// Це викине помилку — username занадто короткий
new UserEntity(1, "abc", "test@gmail.com", "password123");
```

Без Rich Domain Model у сервісі можна забути перевірку.

#### 2. Локальна логіка в Entity
Методи як `isOverdue()`, `isUrgent()` — це чисто доменні знання, не технічні деталі. Вони живуть там, де вони належать.

#### 3. Простота тестування
Тести фокусуються на Entity окремо:

```javascript
describe('TaskEntity', () => {
    it('should mark task as overdue', () => {
        const task = new TaskEntity({...pastDate...});
        expect(task.isOverdue()).toBe(true);
    });
});
```

#### 4. Самодокументуючий код
Entity явно показує свої можливості: не потрібно шукати в сервісі, як оновити користувача — це метод `update()` в Entity.

**Недоліки Anemic підходу:**
- Валідація розкидана по сервісах
- Легко забути перевірку в якомусь місці
- Важче зрозуміти, як користувати Entity
- Дублювання логіки в різних сервісах

