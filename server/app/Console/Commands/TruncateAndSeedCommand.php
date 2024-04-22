<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class TruncateAndSeedCommand extends Command
{
    protected $signature = 'db:truncateAndSeed {--truncate}';

    protected $description = 'This command is used to seed the database, but it can also truncate tables before seeding';

    public function handle()
    {
        $tablesToTruncate = ['table1', 'table2'];  // Replace with your actual table names

        if ($this->option('truncate')) {
            foreach ($tablesToTruncate as $table) {
                if (Schema::hasTable($table)) {
                    DB::table($table)->truncate();
                }
            }
        }

        Artisan::call('db:seed', ['--force' => true]);
        $this->info('The database has been seeded!');
    }
}
