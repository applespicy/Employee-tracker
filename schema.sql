create database employee_db;
use employee_db;
show tables;

select * from department; 

drop table department;




create Table department(
id int not null auto_increment primary key,
name varchar(30)
);

create table employee(
id int not null auto_increment,
frist_name varchar(30),
last_name varchar(30),
role_id int,
manager_id int,
primary key(id)
); 

create table role(
id int not null auto_increment,
title varchar(30),
salary decimal,
department_id int,
primary key(id)
);