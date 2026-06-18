<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Only create admin if it does not exist
        $email = 'adminblgames@gmail.com';

        $user = User::where('email', $email)->first();

        if (!$user) {
            User::create([
                'name' => 'admin',
                'email' => $email,
                'password' => Hash::make('blgamesadmin123'),
            ]);
        }
    }
}
