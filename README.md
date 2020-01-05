## Taxi Booking App

##Video Demo For This App is in this Link : https://github.com/varun2948/TaxiBookingReact/blob/master/Demo_Video/TaxiApp.mp4


[![Build Status](https://travis-ci.com/jeremykenedy/laravel-react-tasks.svg?branch=master)](https://travis-ci.com/jeremykenedy/laravel-react-tasks)
[![StyleCI](https://github.styleci.io/repos/151041710/shield?branch=master)](https://github.styleci.io/repos/151041710)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/jeremykenedy/laravel-react-tasks/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/jeremykenedy/laravel-react-tasks/?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

#### Table of contents
- [About](#about)
- [Features](#features)
- [Installation Instructions](#installation-instructions)
- [Routes](#routes)
- [File Tree](#file-tree)
- [License](#license)

### About
Simple Taxi Booking App Created using Laravel 5.8 API routes and ReactJS UI with Different Plugin/Packages.

### Features
| Laravel React Tasks Features |
| :------------ |
|Built on [Laravel](http://laravel.com/) 5.7|
|Built on [Bootstrap](https://getbootstrap.com/) 4|
|Front End Built on [ReactJS](https://reactjs.org/)|

   ## Taxi Takes The Current Position of Yours and Users also Takes the Current Position so You Might Not See Much Difference So I Recommend To Import The .sql Data into your database.
    
### Installation Instructions
1. Run `git clone https://github.com/varun2948/TaxiBookingReact.git taxi Booking App`
2. From the projects root run `cp .env.example .env`
3. Run `composer install` from the projects root folder
4. From the projects root folder run `php artisan key:generate`
5. From the projects root folder run `npm install`
6. From the projects root folder run `npm start` 
7. Create a Database in MYSQL DB name it whatever u want i am naming it `taxi_app`
8. Now put the database name into `.env` file in the root folder at `DB_DATABASE`.
9. Provide Your Database USERNAME AND PASSWORD in the .env file `DB_USERNAME` and `DB_PASSWORD`.
10. Now Run `php artisan migrate` in the terminal of the root folder.
11. Finally Now From the projects root folder run `php artisan serve`.
12. Now First Signup with Taxi Driver To Get Taxi Driver Around Your Locality when logging as user.
13. Then Sign Up and Signin as User where u can see taxis 
12. You Can import Database for easy access and smooth running of the app from database_file in root folder to mysql database.

## If You Import my .sql database you can user login as `fusemachine@gmail.com` with password : `123456789`


## SCREEN SHOTS
![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/1.png)

![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/2.png)


![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/3.png)


![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/4.png)


![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/5.png)


![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/6.png)


![alt text](https://github.com/varun2948/TaxiBookingReact/blob/master/githubimage/8.png)


### Routes

```
+--------+----------+------------------------+------------------+------------------------------------------------------------------------+------------+
| Domain | Method   | URI                    | Name             | Action                                                                 | Middleware |
+--------+----------+------------------------+------------------+------------------------------------------------------------------------+------------+
|        | GET|HEAD | /                      |                  | Closure                                                                | web        |
|        | POST     | api/booking            |                  | App\Http\Controllers\ApiController@booking                             | api        |
|        | GET|HEAD | api/booking/{id}       |                  | App\Http\Controllers\ApiController@getbooking                          | api        |
|        | GET|HEAD | api/driverbooking/{id} |                  | App\Http\Controllers\ApiController@getdriverbooking                    | api        |
|        | POST     | api/driverregister     |                  | App\Http\Controllers\ApiController@registerdriver                      | api        |
|        | POST     | api/login              |                  | App\Http\Controllers\ApiController@login                               | api        |
|        | POST     | api/register           |                  | App\Http\Controllers\ApiController@register                            | api        |
|        | POST     | api/taxidriver         |                  | App\Http\Controllers\ApiController@addtaxidriver                       | api        |
|        | GET|HEAD | api/taxidriver         |                  | App\Http\Controllers\ApiController@taxidriverlist                      | api        |
|        | DELETE   | api/taxidriver/{id}    |                  | App\Http\Controllers\ApiController@deletetaxidriver                    | api        |
|        | GET|HEAD | api/taxidriver/{id}    |                  | App\Http\Controllers\ApiController@taxidriverdetail                    | api        |
|        | GET|HEAD | home                   | home             | App\Http\Controllers\HomeController@index                              | web,auth   |
|        | GET|HEAD | login                  | login            | App\Http\Controllers\Auth\LoginController@showLoginForm                | web,guest  |
|        | POST     | login                  |                  | App\Http\Controllers\Auth\LoginController@login                        | web,guest  |
|        | POST     | logout                 | logout           | App\Http\Controllers\Auth\LoginController@logout                       | web        |
|        | POST     | password/email         | password.email   | App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail  | web        |
|        | GET|HEAD | password/reset         | password.request | App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm | web        |
|        | POST     | password/reset         | password.update  | App\Http\Controllers\Auth\ResetPasswordController@reset                | web        |
|        | GET|HEAD | password/reset/{token} | password.reset   | App\Http\Controllers\Auth\ResetPasswordController@showResetForm        | web        |
|        | GET|HEAD | register               | register         | App\Http\Controllers\Auth\RegisterController@showRegistrationForm      | web,guest  |
|        | POST     | register               |                  | App\Http\Controllers\Auth\RegisterController@register                  | web,guest  |
+--------+----------+------------------------+------------------+------------------------------------------------------------------------+------------+



## SCREEN SHOTS


### License
Laravel React Taxi Booking App is licensed under the [MIT license](https://opensource.org/licenses/MIT). Enjoy!
