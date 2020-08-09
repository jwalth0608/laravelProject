<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class FileTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
	
	
	public function testUpload()
	{
		Storage::fake('public');

        $response = $this->json('POST', '/upload', [
            'uploadFile' => UploadedFile::fake()->image('avatar.jpg')
        ]);
		

        // Assert a file does not exist...
        Storage::disk('public')->assertMissing('missing.jpg');
		
	}
}
