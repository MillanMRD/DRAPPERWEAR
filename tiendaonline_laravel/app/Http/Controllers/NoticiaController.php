<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;
use App\Models\ImagenNoticia;
use DB;

class NoticiaController extends Controller
{
    public function index()
    {
        $noticias = DB::table("noticias as n")
            ->select("n.*", "i.ruta as imagen")
            ->join("imagennoticias as i", "i.id_noticia", "n.id")
            ->get();
        return response()->json($noticias, 200);
    }

    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'titulo' => 'required',
            'cuerpo' => 'required'
        ]);

        //subir fotografia del noticia
        $dir = "products/";
        $file = $request->file('file');

        if ($request->hasFile('file')) {

            // Crear un nuevo objeto Noticia y asignar los valores del formulario
            $noticia = new Noticia();
            $noticia->titulo = $request->input('titulo');
            $noticia->cuerpo = $request->input('cuerpo');
            $noticia->save();

            $fileName = \Carbon\Carbon::now()->toDateString() . "-" . uniqid() . "." . $file->getClientOriginalExtension();

            if (!\Storage::disk('public')->exists($dir)) {
                \Storage::disk('public')->makeDirectory($dir);
            }
            \Storage::disk('public')->put($dir . $fileName, file_get_contents($file));

            //registrar url en base de datos
            DB::table("imagennoticias")->insert([
                "id_noticia" => $noticia->id,
                "ruta" => $fileName,
                "created_at" => date("Y-m-d H:i:s"),
                "updated_at" => date("Y-m-d H:i:s")
            ]);
        } else {
            return response()->json([
                "code" => 401,
                "message" => 'El noticia no fue registrado'
            ]);
        }

        // Redireccionar a la página de éxito o mostrar un mensaje de éxito
        return response()->json([
            "code" => 201,
            'message' => "Noticia creado correctamente",
            'noticia' => $noticia
        ]);
    }

    public function show($id)
    {

        $noticia = DB::table("noticias as n")
            ->select("n.*", "i.ruta as imagen")
            ->join("imagennoticias as i", "i.id_noticia", "n.id")
            ->where("n.id", $id)
            ->first();

        if ($noticia) {
            return response()->json($noticia, 200);
        } else {
            return response()->json(['error' => 'Noticia no encontrado'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'titulo' => 'required',
            'cuerpo' => 'required',
            'file' => 'file|mimes:jpeg,jpg,png|max:2048', // Validación para el archivo de imagen
        ]);

        $noticia = Noticia::find($id);

        if ($noticia) {
            // Actualizar los valores del noticia con los datos del formulario
            $noticia->Nombre = $request->input('titulo');
            $noticia->Descripcion = $request->input('cuerpo');
            $noticia->save();

            // Actualizar la imagen si se proporciona un nuevo archivo
            if ($request->hasFile('file')) {
                $dir = "products/";
                $file = $request->file('file');

                $fileName = \Carbon\Carbon::now()->toDateString() . "-" . uniqid() . "." . $file->getClientOriginalExtension();

                if (!\Storage::disk('public')->exists($dir)) {
                    \Storage::disk('public')->makeDirectory($dir);
                }
                \Storage::disk('public')->put($dir . $fileName, file_get_contents($file));

                // Actualizar la ruta de la imagen en la tabla "imagennoticias"
                DB::table("imagennoticias")
                    ->where("id_noticia", $noticia->id)
                    ->update([
                        "ruta" => $fileName,
                        "updated_at" => date("Y-m-d H:i:s")
                    ]);
            }

            return response()->json([
                'code' => 200,
                'message' => 'Noticia actualizada correctamente',
                'noticia' => $noticia
            ]);
        } else {
            return response()->json([
                'code' => 404,
                'message' => 'Noticia no encontrado'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $noticia = Noticia::find($id);

        if ($noticia) {
            // Eliminar los registros relacionados en la tabla "imagennoticias"
            DB::table('imagennoticias')->where('id_noticia', $id)->delete();

            // Eliminar el noticia
            $noticia->delete();

            return response()->json([
                'code' => 200,
                'message' => 'Noticia eliminado correctamente'
            ]);
        } else {
            return response()->json([
                'code' => 404,
                'message' => 'Noticia no encontrado'
            ], 404);
        }
    }
}
