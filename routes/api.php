<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', 'LoginController@authenticate');
Route::get('files', 'FilesController@index');
Route::post('files', 'FilesController@store');
Route::get('files/{id}', 'FilesController@show');
Route::put('files/{user_id}', 'FilesController@share');
Route::post('file', 'FilesController@upload');
