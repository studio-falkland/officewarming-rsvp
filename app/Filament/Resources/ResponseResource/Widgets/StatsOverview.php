<?php

namespace App\Filament\Resources\ResponseResource\Widgets;

use App\Models\Response;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            Stat::make('Total responses', Response::count()),
            Stat::make('Attendees', Response::all()->sum('persons')),
        ];
    }
}
