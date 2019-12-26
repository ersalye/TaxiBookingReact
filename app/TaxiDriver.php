<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaxiDriver extends Model
{
    protected $fillable = [
        'driver_name', 'license_name', 'taxi_number','latitude','longitude'
    ];
}
