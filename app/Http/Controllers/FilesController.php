<?php

namespace App\Http\Controllers;

use App\Files;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class FilesController extends Controller
{
    public function index() 
	{
		$user = Auth::user();
		var_dump($user);
		if (!Auth::check()) {
				return response()->json([
				'message' => 'user not logged in'
			  ]);
			}
		$files = Files::orderBy('created_at', 'desc')
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

      public function share(File $file)
      {
        $file->is_completed = true;
        $project->update();

        return response()->json('Project updated!');
      }
	  
	public function upload(Request $request)
		{
			if (!Auth::check()) {
				return response()->json([
				'message' => 'user not logged in'
			  ]);
			}
		  
		  if ($request->file('uploadFile')) {
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
		$upload->owner_id = '1';
		$upload->type = $extension == 'mp4' ? 'video' : 'image';

		  $upload->save();

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
