<?php

include 'bd/BD.php';

header('Access-Control-Allow-Origin: *');

if($_SERVER['REQUEST_METHOD']=='GET'){
    if(isset($_GET['id'])){
        $query="select * from productos where id=".$_GET['id'];
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetch(PDO::FETCH_ASSOC));
    }else{
        $query="select * from productos";
        $resultado=metodoGet($query);
        echo json_encode($resultado->fetchAll()); 
    }
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POST'){
    unset($_POST['METHOD']);
    $Nombre=$_POST['Nombre'];
    $Referencia=$_POST['Referencia'];
    $Precio=$_POST['Precio'];
    $Peso=$_POST['Peso'];
    $Categoria=$_POST['Categoria'];
    $Stock=$_POST['Stock'];
    $Fecha=$_POST['Fecha'];
    $query="insert into productos(Nombre, Referencia, Precio, Peso, Categoria, Stock, Fecha) values ('$Nombre', '$Referencia', '$Precio', '$Peso', '$Categoria', '$Stock', '$Fecha')";
    $queryAutoIncrement="select MAX(id) as id from productos";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='POSTVENTAS'){
    unset($_POST['METHOD']);
    $id=$_POST['id'];
    $qty=$_POST['qty'];
    $query="insert into Ventas(id, qty) values ('$id', '$qty')";
    $queryAutoIncrement="select MAX(id) as id from productos";
    $resultado=metodoPost($query, $queryAutoIncrement);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='PUT'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $Nombre=$_POST['Nombre'];
    $Referencia=$_POST['Referencia'];
    $Precio=$_POST['Precio'];
    $Peso=$_POST['Peso'];
    $Categoria=$_POST['Categoria'];
    $Stock=$_POST['Stock'];
    $Fecha=$_POST['Fecha'];
    $query="UPDATE productos SET Nombre='$Nombre', Referencia='$Referencia', Precio='$Precio', Peso='$Peso', Categoria='$Categoria', Stock='$Stock', Fecha='$Fecha' WHERE id='$id'";
    $resultado=metodoPut($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

if($_POST['METHOD']=='DELETE'){
    unset($_POST['METHOD']);
    $id=$_GET['id'];
    $query="DELETE FROM productos WHERE id='$id'";
    $resultado=metodoDelete($query);
    echo json_encode($resultado);
    header("HTTP/1.1 200 OK");
    exit();
}

header("HTTP/1.1 400 Bad Request");


?>