create database api_db;
use api_db;

create table students (
  id int(15) not null auto_increment,
  name varchar(50) default null,
  lastname varchar(50) default null,
  califications int(5),
  primary key (id)
);

describe students;

