<?php

namespace App\Http\Controllers;

use App\Files;
use App\Files_User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class FilesController extends Controller
{
    public function index(Request $request) 
	{
		$user = json_decode($request->header('user'));
		$files = Files::join('files__users', 'files__users.file_id', '=', 'files.id')
		->select('files.*')
		->where('files__users.user_id', $user->id)
		->orderBy('files.created_at', 'desc')
						->get();
		
		return $files->toJson();
	}
	
	public function store(Request $request)
      {
        $validatedData = $request->validate([
          'name' => 'required',
        ]);

        $project = Project::create([
          'name' => $validatedData['name'],
        ]);

        return response()->json('File saved!');
      }

      public function show($id)
      {
        $file = Files::find($id);
		$file->url = Storage::url($file->url);

        return $file->toJson();
      }

      public function share($user_id, $file_id)
      {
		$FileUser = new Files_User;
		$FileUser->user_id = $user_id;
		$FileUser->file_id = $file_id;
		$FileUser->save();

        return response()->json('File Shared!');
      }
	  
	public function upload(Request $request)
		{
			
		  
		  if ($request->file('uploadFile')) {
			  $user = json_decode($request->header('user'));
			 
			$uploadedFile = $request->file('uploadFile');
			$extension = $request->file('uploadFile')->extension();
		  $filename = time().$uploadedFile->getClientOriginalName();
		  Storage::disk('public')->putFileAs(
			'files/',
			$uploadedFile,
			$filename
		  );

		  $upload = new Files;
		  $upload->name = $filename;
		  $upload->url = 'files/'.$filename;
		$upload->owner_id = $user->id;
		$upload->type = $extension == 'mp4' ? 'video' : 'image';

		  $upload->save();
		  
		  
		  $FileUser = new Files_User;
		$FileUser->user_id = $user->id;
		$FileUser->file_id = $upload->id;
		$FileUser->save();

		  return response()->json([
			'id' => $upload->id,
			'name' => $upload->name,
			'url' => $upload->url,
			'type' => $upload->type
		  ]);
		  } else {
			  return response()->json([
				'message' => 'no dice'
			  ]);
		  }
		}
}
