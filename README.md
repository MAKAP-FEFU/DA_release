# Команда "МАКАР"
## Состав
* Удодов Руслан Игоревич - Frontend-developer
* Макалова Полина Александровна - Data Analyst, Designer
* Ковальский Богдан Иванович - Lead Backend-developer
* Фурманчук Макар Антонович - Backend-developer

# Структура проекта
1. DA_Backend - backend сервиса
2. DA_Frontend - frontend сервиса
3. testing_service - пример сервиса для взаимодействия с программой
4. docs - информация о проекте
5. Демонстрация проекта - https://drive.google.com/drive/folders/1h6IPyXXk3nZWGVNHgkRxYM_0cXcqnsM1

# Запуск проекта
## Backend
1. Создать .env в директории backend в соответсвии с .env.sample
2. Создать .env в backend/src директории backend в соответсвии с /src/.env.sample
3. Все действия выполнять из папки backend
 ```cmd
   docker compose up -d
``` 
4. Для запуска миграций выполнить
   ```cmd
   ./migrations
   ```
5. Для обновление контейнеров
```cmd
 docker compose down & docker compose up -d
```
<a href = "https://github.com/MAKAP-FEFU/DA_Backend/blob/main/backend/requirements.txt"> Версии библиотек <a>

##Frontend
1. Создать .env в директории frontend в соответсвии с .env.example
2. Установить зависимости в директории frontend
```cmd
npm install
   ```
3. Запустить в директории fronend
```cmd
npm run dev
   ```
Требования: node.js >= 21.7.1
