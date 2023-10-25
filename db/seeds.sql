INSERT INTO department (name)
VALUES ("Marketing"),
        ("Human Recouces"),
        ( "Sales"),
        ( "Customer Service");

INSERT INTO role (title, salary, department_id)
VALUES ("Project Manager", 75000, 1),
        ("Project Cordinator", 70000, 1)
        ("HR Manager", 60000, 2),
        ( "Receptionist", 50000,2),
        ( "Sales Manager", 120000, 3),
        ( "Sales Person", 100000, 3),
        ( "Phone Operator", 50000, 4),
        ( "IT Director", 150000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Gorge", "Michel", 1, 2),
         ("Nicolas", "Hummings", 2, null),
        ("Justica", "Fernandez", 3, 4),
        ("Mark", "Twain", 4, null),
        ("Nicole", "Smith", 5, 6),
        ("Allan", "Ancira", 6, null),
        ("Sophia", "Espinosa", 7, 8),
         ("Bob", "Rob", 8, null);