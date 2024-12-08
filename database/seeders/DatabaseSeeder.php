<?php

namespace Database\Seeders;

use App\Enum\PermissionsEnum;
use App\Enum\RolesEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $userRole = Role::create(['name' => RolesEnum::User->value]);
        $adminRole = Role::create(['name' => RolesEnum::Admin->value]);

        $manageEventsPermission = Permission::create(['name' => PermissionsEnum::ManageEvents->value]);
        $manageUsersPermission = Permission::create(['name' => PermissionsEnum::ManageUsers->value]);
        $donatesPermission = Permission::create(['name' => PermissionsEnum::Donates->value]);

        $userRole->syncPermissions([$donatesPermission]);
        $adminRole->syncPermissions([$manageEventsPermission, $manageUsersPermission, $donatesPermission]);

        User::factory()->create([
            'name' => 'User User',
            'email' => 'user@example.com',
        ])->assignRole(RolesEnum::User);

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ])->assignRole(RolesEnum::Admin);
    }
}
