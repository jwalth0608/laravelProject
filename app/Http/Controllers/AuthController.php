namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials, $remember)) {
            // Authentication passed...
            return response()->json('Success');
        } else {
			return response()->json('Failure');
		}
    }
}