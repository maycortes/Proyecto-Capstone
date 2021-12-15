
# Configuracion para la raspberry

sudo sed -i 's/bind-address            = 127.0.0.1/bind-address            = 0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf

systemctl restart mariadb

sudo mysqld --print-defaults



# Para verificar configuracion

netstat -tap | grep -i mysql



# Agregar cliente remoto

mysql -u root -p

SELECT User, Host FROM mysql.user WHERE Host <> 'localhost';

GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.109.133' IDENTIFIED BY 'password123' WITH GRANT OPTION;



# importar base de datos

CREATE DATABASE new_database;

# Salir de mysql e importar BD

mysql -u username -p new_database < data-dump.sql