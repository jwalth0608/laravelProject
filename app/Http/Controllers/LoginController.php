<?php
namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class LoginController extends Controller
{

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (Auth::attempt($credentials)) {
            // Authentication passed...
			$user = Auth::user();
            return response()->json([
			'id' => $user->id,
			'name' => $user->name,
			'email' => $user->email
		  ]);
        } else {
			return response()->json('Failure');
		}
    }
	
	public function newGuy(Request $request)
	{	
		$user = new User;
		
		$user->email = $request->input('email');
		$user->name = $request->input('name');
		$user->password = Hash::make($request->input('password'));
		$user->save();
		
		return response()->json('Success');
	}
	
	
	public function getUsers(Request $request) 
	{
		$user = json_decode($request->header('user'));
		$users = User::where('id', '!=', $user->id)
		->orderBy('created_at', 'desc')
						->get();
		return $users->toJson();
	}
}