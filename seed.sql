use employee_db;

use employee_db;
insert into department(name) values
("HR"), ("Tech"), ("Admins"), ("Management");

select * from role;


insert into employee(frist_name, last_name, role_id)values
("olu", "osh", 1), 
("dipo", "Ibi", 4), 
("Isreal", "Ibi", 1), 
("Caleb", "Are", 2),
("deb", "osh", 5),
("sola", "fed",  6),
("femi", "falana",3);

insert into role(title, salary, department_id)
values
("Director", 25000, 1), 
("Engineer", 65825, 1), 
("Manager", 57555, 3),
("Receptionist", 8752, 2),
("Intern", 2000, 4),
("Web developer", 58999, 4),
("trainer", 25633, 2);