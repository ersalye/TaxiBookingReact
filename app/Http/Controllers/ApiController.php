<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterAuthRequest;
use App\User;
use Illuminate\Http\Request;
use App\TaxiDriver;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class ApiController extends Controller
{
    public $loginAfterSignUp = true;

    public function register(RegisterAuthRequest $request)
    {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
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

    public function login(Request $request)
    {
        $input = $request->only('email', 'password');
        $jwt_token = null;

        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Email or Password',
            ], 401);
        }

        return response()->json([
            'success' => true,
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
        
        $list = TaxiDriver::select('*')->get();
        

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
        $todeletedriver = TaxiDriver::select('*')->where('id','=',$id)->first();
        $list = TaxiDriver::select('*')->get();

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
        $toshowdriver = TaxiDriver::select('*')->where('id','=',$id)->first();
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
}
