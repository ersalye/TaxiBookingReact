<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterAuthRequest;
use App\Http\Requests\RegisterDriverAuthRequest;
use App\User;
use App\Booking;
use Illuminate\Http\Request;
use App\TaxiDriver;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use DB;
class ApiController extends Controller
{
    public $loginAfterSignUp = true;

    public function register(RegisterAuthRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->user_type = 1;
        $user->phoneno = $request->phoneno;
        $user->password = bcrypt($request->password);

        $user->save();

        if ($this->loginAfterSignUp) {
            return $this->login($request);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }
    public function registerdriver(RegisterAuthRequest $request)
    {
        $driver_user = new User();
        $driver_user->name = $request->name;
        $driver_user->email = $request->email;
        $driver_user->password = bcrypt($request->password);
        $driver_user->user_type = 2;
        $driver_user->phoneno = $request->phoneno;
        $driver_user->license_number = $request->license_number;
        $driver_user->taxi_number = $request->taxi_number;
        $driver_user->latitude = $request->latitude;
        $driver_user->longitude = $request->longitude;
        
        $driver_user->save();

        if ($this->loginAfterSignUp) {
            return $this->login($request);
        }

        return response()->json([
            'success' => true,
            'data' => $driver_user
        ], 200);
        
    }

    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $jwt_token = null;
// $userid=User::select('*')->where('user_type','=','2')->get();
        $userid= User::select('id','user_type')->where('email','=',$request->get('email'))->first();
        // dd($userid['id']);
        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }

        return response()->json([
            'success' => true,
            'userid'=>$userid['id'],
            'usertype'=>$userid['user_type'],
            'token' => $jwt_token,
            
        ]);
    }

    public function logout(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        try {
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success' => true,
                'message' => 'User logged out successfully'
            ]);
        } catch (JWTException $exception) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, the user cannot be logged out'
            ], 500);
        }
    }

    public function getAuthUser(Request $request)
    {
        $this->validate($request, [
            'token' => 'required'
        ]);

        $user = JWTAuth::authenticate($request->token);

        return response()->json(['user' => $user]);
    }

    public function addtaxidriver(Request $request){
        // dd($request->all());
        $taxidriver = new TaxiDriver();
        $taxidriver->driver_name = $request->driver_name;
        $taxidriver->license_number = $request->license_number;
        $taxidriver->taxi_number = $request->taxi_number;
        $taxidriver->latitude = $request->latitude;
        $taxidriver->longitude = $request->longitude;
        $taxidriver->save();

        // if ($this->loginAfterSignUp) {
        //     return $this->login($request);
        // }

        return response()->json([
            'success' => true,
            'data' => $taxidriver
        ], 200);
    }
    public function taxidriverlist(){
        
        $list = User::select('*')->where('user_type','=','2')->get();
        

        return response()->json([
            'success' => true,
            'data' => $list
        ], 200);
    }
    // public function deletetaxidriver($id){
    //     dd($id);
    //     $todeletedriver = TaxiDriver::select('*')->where('id','=',$id)->get();
    //     $todeletedriver->delete();
    //     $list = TaxiDriver::select('*')->get();

    //     return response()->json([
    //         'success' => true,
    //         'data' => $list
    //     ], 200);
    // }
    public function deletetaxidriver($id)
    {
        $todeletedriver = User::select('*')->where('id','=',$id)->first();
        $list = User::select('*')->where('user_type','=','2')->get();

        if (!$todeletedriver) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, Taxidriver with id ' . $id . ' cannot be found'
            ], 400);
        }
    
        if ($todeletedriver->delete()) {
            return response()->json([
                'success' => true,
                'message'=> 'Taxi Driver with id'.$id.'Deleted Succesfully',
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Taxi Driver could not be deleted'
            ], 500);
        }
    }
    public function taxidriverdetail($id){
        $toshowdriver = User::select('*')->where('id','=',$id)->where('user_type','=','2')->first();
        if (!$toshowdriver) {
            return response()->json([
                'success' => false,
                'message' => 'Sorry, Taxidriver with id ' . $id . ' cannot be found'
            ], 400);
        }
        else{
            return response()->json([
                'success' => true,
                'data' => $toshowdriver
            ], 200);
        }
    }

    public function booking(Request $request){
        $usertype= $request->get('user_type');
        $userid= $request->get('user_id');
        $taxiid= $request->get('taxi_id');
        // dd($usertype);

        $booking = new Booking();
        $booking->driver_id = $taxiid;
        $booking->user_id = $userid;
        $booking->type = $usertype;
        $booking->save();
        return response()->json([
            'success' => true,
            'data' => $booking
        ], 200);
    }
    public function getbooking($id){
        // dd($usertype);
        // dd('sds');
        $users = DB::table('users')
            ->join('booking', 'booking.driver_id', '=', 'users.id')
            ->select('booking.*', 'users.id as userid','users.name','users.phoneno','users.taxi_number')
            ->where('booking.user_id','=',$id)
            ->get();
        // dd($users);
       

        return response()->json([
            'success' => true,
            'data' => $users
        ], 200);
    }
    public function getdriverbooking($id){
        // dd($usertype);
        // dd('sds');
        $users = DB::table('users')
            ->join('booking', 'booking.user_id', '=', 'users.id')
            ->select('booking.*', 'users.id as userid','users.name','users.phoneno','users.taxi_number')
            ->where('booking.driver_id','=',$id)
            ->get();
        // dd($users);
       

        return response()->json([
            'success' => true,
            'data' => $users
        ], 200);
    }
}
