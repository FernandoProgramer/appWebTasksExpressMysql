-- USUARIOS
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

-- ROLES
CREATE TABLE roles (
    id INT NOT NULL,
    role_name VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);

-- TAREAS
CREATE TABLE tasks (
    id INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    title_task VARCHAR(100) NOT NULL,
    description_task TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    FOREIGN KEY (id_user) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT
    id,
    id_user,
    title_task,
    description_task,
    creation_date,
    update_date
FROM
    tasks;

-- Mostrar tareas por id
SELECT
    t.id as id_task,
    t.id_user as id_user,
    u.username as username_user,
    u.email as email_user,
    t.title_task,
    t.description_task,
    t.creation_date,
    t.update_date,
    (
        SELECT
            COUNT(*)
        FROM
            tasks
        WHERE
            id_user = t.id_user
    ) AS count_tasks
FROM
    tasks t
    INNER JOIN users u ON t.id_user = u.id
ORDER BY
    creation_date DESC;

-- Conteo de coincidencias .tasks
SELECT
    COUNT(*)
FROM
    tasks
WHERE
    id_user = 4;

-- Insertar teras
INSERT INTO
    tasks (id_user, title_task, description_task)
VALUES
    (
        8,
        'Sacar la basura',
        'Debo de poner la basura de atras afuera para que el carro de la basura lo recoja'
    );

UPDATE
    tasks
SET
    title_task = IFNULL(?, title_task),
    description_task = IFNULL(?, title_task)
WHERE
    id_task = ?;