<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddExtraFieldToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->integer('user_type')->unsigned()->after('password');
            $table->string('phoneno', 100)->after('user_type');
            $table->string('license_number', 100)->after('phoneno')->nullable();
            $table->string('taxi_number', 100)->after('license_number')->nullable();
            $table->double('latitude', 9, 6)->nullable()->after('taxi_number')->nullable();
            $table->double('longitude', 9, 6)->nullable()->after('latitude')->nullable();
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            
            $table->dropColumn('user_type');
            $table->dropColumn('phoneno');
            $table->dropColumn('license_number');
            $table->dropColumn('taxi_number');
            $table->dropColumn('latitude');
            $table->dropColumn('longitude');
        });
    }
}
