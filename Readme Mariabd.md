# Uso de la base de datos 

## Archivo bd.sql
...
sudo mysql -u root -p <bd.sql

## Archivo inserción.sql
...
sudo mysql -u root -p <insercion.sql

![](./imagenes/02.gif)

...

## Muestra de las tablas que tenemos en la base de datos  
...
sudo -u root -p -e "show databases"

![](./imagenes/03.gif)

## Uso de la tabla Hospital y mostrar las tablas que conforman nuetsro proyecto 
...
sudo -u root -p -e "use hospital; show tables;"

![](./imagenes/05.gif)
