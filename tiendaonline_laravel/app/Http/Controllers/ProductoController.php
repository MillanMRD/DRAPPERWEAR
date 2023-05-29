<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Producto;
use App\Models\Cliente;
use App\Models\ImagenProducto;
use App\Models\Pedidos;
use App\Models\DetallePedido; // Asegúrate de importar el modelo DetallePedido

use DB;


class ProductoController extends Controller
{
    public function index()
    {
        $productos = DB::table("productos as p")
            ->select("p.*", "i.ruta as imagen")
            ->join("imagenproducto as i", "i.id_producto", "p.ID_Producto")
            ->get();
        return response()->json($productos, 200);
    }

    public function store(Request $request)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'Nombre' => 'required',
            'Descripcion' => 'required',
            'Precio' => 'required|numeric',
            'Stock' => 'required|integer',
        ]);

        //subir fotografia del producto
        $dir = "products/";
        $file = $request->file('file');

        if ($request->hasFile('file')) {

            // Crear un nuevo objeto Producto y asignar los valores del formulario
            $producto = new Producto();
            $producto->Nombre = $request->input('Nombre');
            $producto->Descripcion = $request->input('Descripcion');
            $producto->Precio = $request->input('Precio');
            $producto->Stock = $request->input('Stock');
            $producto->save();

            $fileName = \Carbon\Carbon::now()->toDateString() . "-" . uniqid() . "." . $file->getClientOriginalExtension();

            if (!\Storage::disk('public')->exists($dir)) {
                \Storage::disk('public')->makeDirectory($dir);
            }
            \Storage::disk('public')->put($dir . $fileName, file_get_contents($file));

            //registrar url en base de datos
            DB::table("imagenproducto")->insert([
                "id_producto" => $producto->ID_Producto,
                "ruta" => $fileName,
                "created_at" => date("Y-m-d H:i:s"),
                "updated_at" => date("Y-m-d H:i:s")
            ]);
        } else {
            return response()->json([
                "code" => 401,
                "message" => 'El producto no fue registrado'
            ]);
        }

        // Redireccionar a la página de éxito o mostrar un mensaje de éxito
        return response()->json([
            "code" => 201,
            'message' => "Producto creado correctamente",
            'producto' => "xxx"
        ]);
    }

    public function show($id)
    {

        $producto = DB::table("productos as p")
            ->select("p.*", "i.ruta as imagen")
            ->join("imagenproducto as i", "i.id_producto", "p.ID_Producto")
            ->where("p.ID_Producto", $id)
            ->first();

        if ($producto) {
            return response()->json($producto, 200);
        } else {
            return response()->json(['error' => 'Producto no encontrado'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        // Validar los datos del formulario
        $validatedData = $request->validate([
            'Nombre' => 'required',
            'Descripcion' => 'required',
            'Precio' => 'required|numeric',
            'Stock' => 'required|integer',
            'file' => 'file|mimes:jpeg,jpg,png|max:2048', // Validación para el archivo de imagen
        ]);

        $producto = Producto::find($id);

        if ($producto) {
            // Actualizar los valores del producto con los datos del formulario
            $producto->Nombre = $request->input('Nombre');
            $producto->Descripcion = $request->input('Descripcion');
            $producto->Precio = $request->input('Precio');
            $producto->Stock = $request->input('Stock');
            $producto->save();

            // Actualizar la imagen si se proporciona un nuevo archivo
            if ($request->hasFile('file')) {
                $dir = "products/";
                $file = $request->file('file');

                $fileName = \Carbon\Carbon::now()->toDateString() . "-" . uniqid() . "." . $file->getClientOriginalExtension();

                if (!\Storage::disk('public')->exists($dir)) {
                    \Storage::disk('public')->makeDirectory($dir);
                }
                \Storage::disk('public')->put($dir . $fileName, file_get_contents($file));

                // Actualizar la ruta de la imagen en la tabla "imagenproducto"
                DB::table("imagenproducto")
                    ->where("id_producto", $producto->ID_Producto)
                    ->update([
                        "ruta" => $fileName,
                        "updated_at" => date("Y-m-d H:i:s")
                    ]);
            }

            return response()->json([
                'code' => 200,
                'message' => 'Producto actualizado correctamente',
                'producto' => $producto
            ]);
        } else {
            return response()->json([
                'code' => 404,
                'message' => 'Producto no encontrado'
            ], 404);
        }
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);

        if ($producto) {
            // Eliminar los registros relacionados en la tabla "imagenproducto"
            DB::table('imagenproducto')->where('id_producto', $id)->delete();

            // Eliminar el producto
            $producto->delete();

            return response()->json([
                'code' => 200,
                'message' => 'Producto eliminado correctamente'
            ]);
        } else {
            return response()->json([
                'code' => 404,
                'message' => 'Producto no encontrado'
            ], 404);
        }
    }

    public function mostrarDatosDetallePedidos()
    {
        $pedidos = DetallePedido::all();
        return response()->json($pedidos);
    }

    //Compras
    public function shopp(Request $request)
    {

        $rules = array(
            'nombre' => 'required',
            'apellido' => 'required',
            'email' => 'required',
            'direccion' => 'required',
            'telefono' => 'required',
            'cantidad' => 'required',
            'precio' => 'required',
            'descripcion' => 'required'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            return response()->json([
                "code" =>  401,
                'message' => "Hay campos vacios, revise por favor"
            ]);
        }

        //cliente
        $check = Cliente::where("email", $request->email)->get();

        if (count($check) > 0) {
            ///////
            $cliente = Cliente::where("email", $request->email)->first();
        } else {

            $cliente = Cliente::create([
                'Nombre' => $request->nombre,
                'Apellido' => $request->apellido,
                'Email' => $request->email,
                'Direccion' => $request->direccion,
                'Telefono' => $request->telefono
            ]);
        }

        //registrar compra
        $total = 0;
        if ($request->cantidad > 1) {

            for ($i = 0; $i < $request->cantidad; $i++) {
                $total += $request->precio;
            }

            $compra = Pedidos::create([
                'fecha' => $request->fecha,
                'ID_cliente' => $cliente->Id_cliente,
                'Total' => $total
            ]);

            for ($x = 0; $x < $request->cantidad; $x++) {

                DB::table("detalle_pedidos")->insert([
                    'ID_pedido' => $compra->Id_pedido,
                    'ID_producto' => $request->uid,
                    'Cantidad' => 1,
                    'Precio_unitario' => $request->precio,
                    'created_at' => date("Y-m-d H:i:s"),
                    'updated_at' => date("Y-m-d H:i:s")
                ]);
            }

            $ped = DB::table("detalle_pedidos")->where("ID_pedido", $compra->Id_pedido)->get();
            $items = [];
            foreach ($ped as $i => $val) {
                $items[$i]["name"] = $request->descripcion;
                $items[$i]["quantity"] = 1;
                $items[$i]["unit_amount"]["currency_code"] = $request->currency_code;
                $items[$i]["unit_amount"]["value"] = $val->Precio_unitario;
            }
        } else {
            $total = $request->precio;
            $compra = Pedidos::create([
                'fecha' => $request->fecha,
                'ID_cliente' => $cliente->Id_cliente,
                'Total' => $request->precio
            ]);

            DB::table("detalle_pedidos")->insert([
                'ID_pedido' => $compra->Id_pedido,
                'ID_producto' => $request->uid,
                'Cantidad' => $request->cantidad,
                'Precio_unitario' => $request->precio,
                'created_at' => date("Y-m-d H:i:s"),
                'updated_at' => date("Y-m-d H:i:s")
            ]);

            $items = array([
                "name" => $request->descripcion,
                "quantity" => $request->cantidad,
                "unit_amount" => [
                    "currency_code" => $request->currency_code,
                    "value" => $total
                ]
            ]);
        }

        return response()->json([
            "code" =>  201,
            'message' => "Compra creada exitosamente",
            "data" => [
                "total" => $total,
                "items" => $items,

                "cantidad" => $request->cantidad,
                "precio" => $request->precio,
                "descripcion" => $request->descripcion,
            ]
        ]);
    }
}
