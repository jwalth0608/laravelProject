<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    protected $fillable = [
        'name', 'url', 'type', 'owner_id'
    ];
	
	public function users() {
		return $this->belongsToMany('App\User');
	}
}
