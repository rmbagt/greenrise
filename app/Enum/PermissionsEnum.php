<?php

namespace App\Enum;

enum PermissionsEnum: string
{
    case ManageEvents = 'manage_events';
    case ManageUsers = 'manage_users';
    case Donates = 'donates';
    
}
