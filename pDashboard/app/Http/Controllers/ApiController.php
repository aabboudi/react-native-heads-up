<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ApiController extends Controller
{
    public function fetch_blogs()
    {
        $blogs = DB::table("blogs")->get();
        return json_encode($blogs);
    }

    public function fetch_blog($id)
    {
        $blog = DB::table("blogs")->where("id", "=", $id)->get();
        return json_encode($blog);
    }

    public function create_blog(Request $request)
    {
        $description = $request->description;
        if(empty($description)) $description = "";

        $file = $_FILES['file']['name'];
        $file_tmp = $_FILES['file']['tmp_name'];
        move_uploaded_file($file_tmp,'./storage/'.$file);
        $dir = str_replace('\\', '/', getcwd());
        $dir = str_replace($_SERVER['DOCUMENT_ROOT'], '', $dir);
        $filePath = 'http://' . $_SERVER['HTTP_HOST'] . $dir . '/storage/' . $file;

        DB::table("blogs")->insert([
            "title" => $request->title,
            "description" => $request->description,
            "attachement" => $filePath
        ]);

        return json_encode(["status" => true]);
    }

    public function delete_blog($id)
    {
        DB::table("blogs")->where("id", "=", $id)->delete();
        return json_encode(["status" => true]);
    }

    public function update_blog(Request $request, $id)
    {
        DB::table("blogs")->where("id", "=", $id)->update([
            "title" => $request->title,
            "description" => $request->description,
            "attachement" => $request->attachement
        ]);

        return json_encode(["status" => true]);

    }
}
