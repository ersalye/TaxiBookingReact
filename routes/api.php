<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', 'ApiController@login');
Route::post('register', 'ApiController@register');
Route::post('driverregister', 'ApiController@registerdriver');
 
// Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('taxidriver/{id}', 'ApiController@taxidriverdetail');
    Route::get('taxidriver', 'ApiController@taxidriverlist');
    Route::post('taxidriver', 'ApiController@addtaxidriver');
    Route::delete('taxidriver/{id}', 'ApiController@deletetaxidriver');

    Route::post('booking', 'ApiController@booking');
    Route::get('booking/{id}', 'ApiController@getbooking');
    Route::get('driverbooking/{id}', 'ApiController@getdriverbooking');

    // Route::get('user', 'ApiController@getAuthUser');
 
    // Route::get('products', 'ProductController@index');
    // Route::get('products/{id}', 'ProductController@show');
    // Route::post('products', 'ProductController@store');
    // Route::post('products/{id}', 'ProductController@update');
    // Route::delete('products/{id}', 'ProductController@destroy');
// });


// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
